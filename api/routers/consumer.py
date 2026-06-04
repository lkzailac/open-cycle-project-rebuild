from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from api.dependencies.db import get_db
from api.models.company_profile import CompanyProfile
from api.models.product import Product

router = APIRouter()


@router.get("/{user_id}")
async def get_all_products(user_id: int, db: AsyncSession = Depends(get_db)):
    # Single JOIN query — fixes Flask's N+1 (one Company.query.filter per product)
    stmt = (
        select(Product, CompanyProfile.name.label("company_name"))
        .join(CompanyProfile, Product.company_id == CompanyProfile.id)
        .options(
            selectinload(Product.consumer_uses),
        )
    )
    rows = (await db.execute(stmt)).all()

    products = []
    for row in rows:
        prod_dict = row.Product.to_dict()
        prod_dict["company_name"] = row.company_name
        products.append(prod_dict)

    return {"all": products}
