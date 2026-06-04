"""
Run with: python -m api.seeds.seed
Drops all tables and re-creates fresh seed data.
"""
import asyncio

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from api.auth.password import hash_password
from api.database import AsyncSessionLocal, Base, engine
from api.models import (  # noqa: F401 – registers models with Base.metadata
    Account,
    Component,
    CompanyProfile,
    ConsumerUse,
    CountryGrid,
    Factory,
    ManufacturingProcess,
    Product,
    TransportMode,
)
from api.models.product import component_product, use_product


async def reset_schema():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)


async def seed(db: AsyncSession):
    # ── Lookup: country grids ──────────────────────────────────────────────
    grids = [
        CountryGrid(name="China grid", electricity=0.63),
        CountryGrid(name="US grid", electricity=0.43),
        CountryGrid(name="Vietnam grid", electricity=0.78),
        CountryGrid(name="Peru grid", electricity=0.50),
    ]
    db.add_all(grids)
    await db.flush()

    # ── Lookup: factories ─────────────────────────────────────────────────
    factories = [
        Factory(name="Shine Bright", location="Dongguan, China", country_grid_id=grids[0].id),
        Factory(name="Stella", location="Chengdu, China", country_grid_id=grids[0].id),
        Factory(name="High More", location="Hanoi, Vietnam", country_grid_id=grids[2].id),
        Factory(name="Singing Wind", location="Los Angeles, CA", country_grid_id=grids[1].id),
        Factory(name="Lightning", location="Lima, Peru", country_grid_id=grids[3].id),
    ]
    db.add_all(factories)
    await db.flush()

    # ── Lookup: manufacturing processes ──────────────────────────────────
    processes = [
        ManufacturingProcess(name="Apparel-Cut and Sew", weight=2.0),
        ManufacturingProcess(name="Footwear-Manufacture", weight=9.48),
        ManufacturingProcess(name="Cookware-Cast Iron", weight=5.67),
    ]
    db.add_all(processes)
    await db.flush()

    # ── Lookup: transport modes ───────────────────────────────────────────
    transport = [
        TransportMode(name="Air", weight=0.80),
        TransportMode(name="Ocean", weight=0.03),
        TransportMode(name="Truck", weight=0.13),
    ]
    db.add_all(transport)
    await db.flush()

    # ── Lookup: consumer uses ────────────────────────────────────────────
    uses = [
        ConsumerUse(name="Cold wash", weight=0.055),
        ConsumerUse(name="Hand wash", weight=0.0),
        ConsumerUse(name="Hot wash", weight=0.08),
        ConsumerUse(name="Dry clean", weight=0.18),
        ConsumerUse(name="Tumble Dry", weight=0.61),
        ConsumerUse(name="Dishwasher", weight=0.12),
    ]
    db.add_all(uses)
    await db.flush()

    # ── Lookup: components ────────────────────────────────────────────────
    components = [
        Component(name="sneaker outsole", material="eva", weight_g=500, total_used=8, waste_recycled=False, material_recycled_percent=0),
        Component(name="Pu lining", material="pu", weight_g=200, total_used=8, waste_recycled=True, material_recycled_percent=20),
        Component(name="Leather Upper", material="cow leather", weight_g=300, total_used=10, waste_recycled=True, material_recycled_percent=30),
        Component(name="Laces", material="cotton", weight_g=50, total_used=18, waste_recycled=False, material_recycled_percent=0),
        Component(name="Cotton", material="cotton", weight_g=200, total_used=6, waste_recycled=True, material_recycled_percent=40),
        Component(name="Rivet", material="aluminium", weight_g=2, total_used=20, waste_recycled=True, material_recycled_percent=80),
        Component(name="Denim", material="cotton denim", weight_g=300, total_used=8, waste_recycled=True, material_recycled_percent=20),
        Component(name="Zipper", material="brass", weight_g=20, total_used=6, waste_recycled=True, material_recycled_percent=50),
        Component(name="enamel", material="enamel", weight_g=200, total_used=4, waste_recycled=False, material_recycled_percent=0),
        Component(name="lid", material="cast iron", weight_g=800, total_used=10, waste_recycled=True, material_recycled_percent=70),
        Component(name="handle", material="brass", weight_g=300, total_used=5, waste_recycled=True, material_recycled_percent=33),
        Component(name="body", material="ceramic", weight_g=1000, total_used=12, waste_recycled=False, material_recycled_percent=0),
    ]
    db.add_all(components)
    await db.flush()

    # ── Accounts + company profiles ──────────────────────────────────────
    pw = hash_password("password")
    company_data = [
        dict(
            email="demo@company.com", name="Demo Company",
            logo_url="https://res.cloudinary.com/dbu0tmeuc/image/upload/v1622751854/openCycleProject/demo-logo_ccabeb.svg",
            statement="Here at Demo Company our goal is to involve and educate our customers.",
            warehouse_location="Atlanta, GA, USA", products_sold=2, carbon_goal=0,
            carbon_goal_date="2022-06-03", transparency_score=7, c_footprint_mt=0,
        ),
        dict(
            email="nike@company.com", name="Nike",
            logo_url="https://res.cloudinary.com/dbu0tmeuc/image/upload/v1622756818/openCycleProject/nike-logo_qqms7c.svg",
            statement="Here at Nike our goal is to involve and educate our customers.",
            warehouse_location="Portland, OR, USA", products_sold=100, carbon_goal=0,
            carbon_goal_date="2023-06-03", transparency_score=3, c_footprint_mt=0,
        ),
        dict(
            email="zara@company.com", name="Zara",
            logo_url="https://res.cloudinary.com/dbu0tmeuc/image/upload/v1622757764/openCycleProject/zara-logo_rapvve.svg",
            statement="Here at Zara our goal is to involve and educate our customers.",
            warehouse_location="Alicante, Spain", products_sold=200, carbon_goal=0,
            carbon_goal_date="2025-06-03", transparency_score=1, c_footprint_mt=0,
        ),
        dict(
            email="staub@company.com", name="Staub",
            logo_url="https://res.cloudinary.com/dbu0tmeuc/image/upload/v1622758186/openCycleProject/staub-logo_gezmkq.svg",
            statement="Here at Staub our goal is to involve and educate our customers.",
            warehouse_location="Alsace, France", products_sold=200, carbon_goal=0,
            carbon_goal_date="2025-06-03", transparency_score=2, c_footprint_mt=0,
        ),
    ]
    company_accounts = []
    company_profiles = []
    for d in company_data:
        acc = Account(email=d["email"], hashed_password=pw, role="company")
        db.add(acc)
        await db.flush()
        prof = CompanyProfile(
            account_id=acc.id, name=d["name"], logo_url=d["logo_url"],
            statement=d["statement"], warehouse_location=d["warehouse_location"],
            products_sold=d["products_sold"], carbon_goal=d["carbon_goal"],
            carbon_goal_date=d["carbon_goal_date"],
            transparency_score=d["transparency_score"], c_footprint_mt=d["c_footprint_mt"],
        )
        db.add(prof)
        await db.flush()
        company_accounts.append(acc)
        company_profiles.append(prof)

    # Demo user (consumer)
    demo_user = Account(email="demo@aa.io", username="Demo", hashed_password=pw, role="user")
    db.add(demo_user)
    await db.flush()

    # profile[0]=Demo Company, profile[1]=Nike, profile[2]=Zara, profile[3]=Staub
    demo_id, nike_id, zara_id, staub_id = [p.id for p in company_profiles]

    # ── Products ─────────────────────────────────────────────────────────
    sneaker_comps = [components[0], components[1], components[2], components[3]]
    apparel_comps = [components[4], components[5], components[6], components[7]]
    cookware_comps = [components[8], components[9], components[10], components[11]]
    wash_uses = [uses[0], uses[2]]
    dishwasher_uses = [uses[5]]

    products_data = [
        Product(name="Lili Dress", company_id=demo_id, photo_url="https://res.cloudinary.com/dbu0tmeuc/image/upload/v1623193608/openCycleProject/original_nt4zmg.jpg", product_category="Dress", manufacturing_process_id=processes[0].id, product_weight_g=0.4, package_weight_g=0.5, factory_id=factories[3].id, unit="single", transport_mode_id=transport[2].id, number_of_cycles=50, returnable=True, product_returned_percent=80, product_recycled_percent=40, carbon_footprint_kg=0),
        Product(name="Air Jordan", company_id=nike_id, photo_url="https://res.cloudinary.com/dbu0tmeuc/image/upload/v1623192875/openCycleProject/air-jordan_c8wccz.jpg", product_category="Sneaker", manufacturing_process_id=processes[1].id, product_weight_g=1.2, package_weight_g=2.3, factory_id=factories[2].id, unit="pair", transport_mode_id=transport[0].id, number_of_cycles=2, returnable=False, product_returned_percent=0, product_recycled_percent=0, carbon_footprint_kg=0),
        Product(name="Air Zoom", company_id=nike_id, photo_url="https://res.cloudinary.com/dbu0tmeuc/image/upload/v1623193262/openCycleProject/air-zoom_knryst.jpg", product_category="Sneaker", manufacturing_process_id=processes[1].id, product_weight_g=2.2, package_weight_g=3.2, factory_id=factories[0].id, unit="pair", transport_mode_id=transport[1].id, number_of_cycles=3, returnable=False, product_returned_percent=0, product_recycled_percent=0, carbon_footprint_kg=0),
        Product(name="Blazer Low", company_id=nike_id, photo_url="https://res.cloudinary.com/dbu0tmeuc/image/upload/v1623193398/openCycleProject/blazer-low-77-vintage-mens-shoe-kw53J0_hpytzp.jpg", product_category="Sneaker", manufacturing_process_id=processes[1].id, product_weight_g=1.7, package_weight_g=2.0, factory_id=factories[1].id, unit="pair", transport_mode_id=transport[1].id, number_of_cycles=3, returnable=False, product_returned_percent=0, product_recycled_percent=0, carbon_footprint_kg=0),
        Product(name="Waffle Racer", company_id=nike_id, photo_url="https://res.cloudinary.com/dbu0tmeuc/image/upload/v1623193398/openCycleProject/waffle-racer-crater-womens-shoe-5cbMJ0_hv1imh.jpg", product_category="Sneaker", manufacturing_process_id=processes[1].id, product_weight_g=1.7, package_weight_g=2.0, factory_id=factories[1].id, unit="pair", transport_mode_id=transport[1].id, number_of_cycles=3, returnable=False, product_returned_percent=0, product_recycled_percent=0, carbon_footprint_kg=0),
    ]
    for p in products_data:
        db.add(p)
    await db.flush()

    # Assign M2M via direct table inserts (avoids async lazy-load issue)
    m2m_comps = []
    m2m_uses = []
    for comp in apparel_comps:
        m2m_comps.append({"component_id": comp.id, "product_id": products_data[0].id})
    for use in wash_uses:
        m2m_uses.append({"consumer_use_id": use.id, "product_id": products_data[0].id})
    for p in products_data[1:]:
        for comp in sneaker_comps:
            m2m_comps.append({"component_id": comp.id, "product_id": p.id})
        for use in wash_uses:
            m2m_uses.append({"consumer_use_id": use.id, "product_id": p.id})

    if m2m_comps:
        await db.execute(component_product.insert(), m2m_comps)
    if m2m_uses:
        await db.execute(use_product.insert(), m2m_uses)

    await db.flush()

    # Calc footprints — reload each product with relationships
    from sqlalchemy import select
    from sqlalchemy.orm import selectinload
    for p in products_data:
        stmt = (
            select(Product)
            .options(
                selectinload(Product.components),
                selectinload(Product.consumer_uses),
                selectinload(Product.factory).selectinload(Factory.country_grid),
                selectinload(Product.manufacturing_process),
                selectinload(Product.transport_mode),
            )
            .where(Product.id == p.id)
        )
        loaded = (await db.execute(stmt)).scalar_one()
        loaded.calc_footprint()

    await db.commit()
    print(f"✓ Seeded {len(company_profiles)} companies, 1 user, {len(products_data)} products")


async def main():
    print("Resetting schema…")
    await reset_schema()
    print("Seeding data…")
    async with AsyncSessionLocal() as db:
        await seed(db)
    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(main())
