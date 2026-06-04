from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from api.dependencies.auth import require_company
from api.dependencies.db import get_db
from api.models.account import Account
from api.models.lookup import Component, ConsumerUse, Factory, ManufacturingProcess, TransportMode
from api.models.product import Product
from api.schemas.product import ProductCreate, ProductUpdate

router = APIRouter()


@router.get("/{id}")
async def company_dashboard(id: int, db: AsyncSession = Depends(get_db)):
    # Single query with eager loading — no N+1, no separate lookup fetches
    products_stmt = (
        select(Product)
        .options(
            selectinload(Product.components),
            selectinload(Product.consumer_uses),
            selectinload(Product.factory).selectinload(Factory.country_grid),
            selectinload(Product.manufacturing_process),
            selectinload(Product.transport_mode),
        )
        .where(Product.company_id == id)
    )
    products = (await db.execute(products_stmt)).scalars().all()

    components = (await db.execute(select(Component))).scalars().all()
    manufacturing = (await db.execute(select(ManufacturingProcess))).scalars().all()
    factories = (await db.execute(select(Factory))).scalars().all()
    transport_modes = (await db.execute(select(TransportMode))).scalars().all()
    consumer_uses = (await db.execute(select(ConsumerUse))).scalars().all()

    return {
        "products": [p.to_dict() for p in products],
        "components": [c.to_dict() for c in components],
        "manufacturing": [m.to_dict() for m in manufacturing],
        "factories": [f.to_dict() for f in factories],
        "transport_modes": [t.to_dict() for t in transport_modes],
        "consumer_uses": [u.to_dict() for u in consumer_uses],
    }


@router.post("/products", status_code=201)
async def create_product(
    data: ProductCreate,
    account: Account = Depends(require_company),
    db: AsyncSession = Depends(get_db),
):
    if data.company_id != account.company_profile.id:
        raise HTTPException(403, "Cannot create products for another company")

    product = Product(
        name=data.name,
        photo_url=data.photo_url,
        company_id=data.company_id,
        product_category=data.product_category,
        manufacturing_process_id=data.manufacturing_process_id,
        product_weight_g=data.product_weight_g,
        package_weight_g=data.package_weight_g,
        factory_id=data.factory_id,
        unit=data.unit,
        transport_mode_id=data.transport_mode_id,
        number_of_cycles=data.number_of_cycles,
        returnable=data.returnable,
        product_returned_percent=data.product_returned_percent,
        product_recycled_percent=data.product_recycled_percent,
    )
    db.add(product)
    await db.flush()   # gets product.id — no query.all()[-1] race condition

    if data.compArray:
        comps = (await db.execute(
            select(Component).where(Component.id.in_(data.compArray))
        )).scalars().all()
        product.components = comps

    if data.useArray:
        uses = (await db.execute(
            select(ConsumerUse).where(ConsumerUse.id.in_(data.useArray))
        )).scalars().all()
        product.consumer_uses = uses

    await db.flush()

    # load relationships needed for footprint calculation
    await db.refresh(product, ["manufacturing_process", "factory", "transport_mode",
                               "components", "consumer_uses"])
    product.calc_footprint()
    await db.commit()
    await db.refresh(product, ["components", "consumer_uses"])

    return product.to_dict()


@router.get("/products/{id}")
async def get_product(id: int, db: AsyncSession = Depends(get_db)):
    stmt = (
        select(Product)
        .options(
            selectinload(Product.components),
            selectinload(Product.consumer_uses),
            selectinload(Product.factory).selectinload(Factory.country_grid),
            selectinload(Product.manufacturing_process),
            selectinload(Product.transport_mode),
        )
        .where(Product.id == id)
    )
    product = (await db.execute(stmt)).scalar_one_or_none()
    if not product:
        raise HTTPException(404)
    return product.to_dict()


@router.put("/products/{id}")
async def update_product(
    id: int,
    data: ProductUpdate,
    account: Account = Depends(require_company),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(Product)
        .options(
            selectinload(Product.components),
            selectinload(Product.consumer_uses),
            selectinload(Product.factory).selectinload(Factory.country_grid),
            selectinload(Product.manufacturing_process),
            selectinload(Product.transport_mode),
        )
        .where(Product.id == id)
    )
    product = (await db.execute(stmt)).scalar_one_or_none()
    if not product:
        raise HTTPException(404)
    if product.company_id != account.company_profile.id:
        raise HTTPException(403, "Cannot edit another company's product")

    updates = data.model_dump(exclude_none=True)

    # Handle M2M fields separately
    if "compArray" in updates:
        comps = (await db.execute(
            select(Component).where(Component.id.in_(updates.pop("compArray")))
        )).scalars().all()
        product.components = comps

    if "useArray" in updates:
        uses = (await db.execute(
            select(ConsumerUse).where(ConsumerUse.id.in_(updates.pop("useArray")))
        )).scalars().all()
        product.consumer_uses = uses

    for field, value in updates.items():
        setattr(product, field, value)

    product.calc_footprint()
    await db.commit()
    await db.refresh(product, ["components", "consumer_uses"])
    return product.to_dict()


@router.delete("/products/{id}")
async def delete_product(
    id: int,
    account: Account = Depends(require_company),   # was unprotected in Flask
    db: AsyncSession = Depends(get_db),
):
    product = await db.get(Product, id)
    if not product:
        raise HTTPException(404)
    if product.company_id != account.company_profile.id:
        raise HTTPException(403, "Cannot delete another company's product")

    await db.delete(product)
    await db.commit()
    return {"id": id}
