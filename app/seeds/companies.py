from werkzeug.security import generate_password_hash
from app.models import db, Company



def seed_companies():

    demo_company = Company(
        name='Demo Company',
        admin_email='demo@company.com',
        password='password',
        logo_url="https://res.cloudinary.com/dbu0tmeuc/image/upload/v1622751854/openCycleProject/demo-logo_ccabeb.svg",
        statement= "Here at Demo Company our goal is involve and educate our customers so they may make educated purchases. By offering a carefully curated product range fit for all seasons, we’re able to maintain a small, tight-knit supply chain. We build deep, multi-year relationships with factories and keep in consistent contact—we visit them, they visit us. In addition to conducting our own audits when necessary, we accept third-party, mutually recognized standards to reduce audit fatigue at factories and ensure safe, lawful, humane, and ethical manufacturing practices.",
        warehouse_location= "Altanta, GA, USA",
        products_sold=2,
        carbon_goal= 0,
        carbon_goal_date= '2022-06-03 16:08:33.882507',
        transparency_score= 7,
        c_footprint_mt= 0,
        signup_date = '2021-06-03 16:08:33.882507',


    )
    c2 = Company(
        name='Nike',
        admin_email='nike@company.com',
        password='password',
        logo_url="https://res.cloudinary.com/dbu0tmeuc/image/upload/v1622756818/openCycleProject/nike-logo_qqms7c.svg",
        statement= "Here at Nike our goal is involve and educate our customers so they may make educated purchases. By offering a carefully curated product range fit for all seasons, we’re able to maintain a small, tight-knit supply chain. We build deep, multi-year relationships with factories and keep in consistent contact—we visit them, they visit us. In addition to conducting our own audits when necessary, we accept third-party, mutually recognized standards to reduce audit fatigue at factories and ensure safe, lawful, humane, and ethical manufacturing practices.",
        warehouse_location= "Portland, OR, USA",
        products_sold=100,
        carbon_goal= 0,
        carbon_goal_date= '2023-06-03 16:08:33.882507',
        transparency_score= 3,
        c_footprint_mt= 0,
        signup_date = '2021-06-03 16:08:33.882507',

    )

    c3 = Company(
        name='Zara',
        admin_email='zara@company.com',
        password='password',
        logo_url="https://res.cloudinary.com/dbu0tmeuc/image/upload/v1622757764/openCycleProject/zara-logo_rapvve.svg",
        statement= "Here at Zara our goal is involve and educate our customers so they may make educated purchases. By offering a carefully curated product range fit for all seasons, we’re able to maintain a small, tight-knit supply chain. We build deep, multi-year relationships with factories and keep in consistent contact—we visit them, they visit us. In addition to conducting our own audits when necessary, we accept third-party, mutually recognized standards to reduce audit fatigue at factories and ensure safe, lawful, humane, and ethical manufacturing practices.",
        warehouse_location= "Alicante, Spain",
        products_sold=200,
        carbon_goal= 0,
        carbon_goal_date= '2025-06-03 16:08:33.882507',
        transparency_score= 1,
        c_footprint_mt= 0,
        signup_date = '2021-06-03 16:08:33.882507',

    )

    c4 = Company(
        name='Staub',
        admin_email='staub@company.com',
        password='password',
        logo_url="https://res.cloudinary.com/dbu0tmeuc/image/upload/v1622758186/openCycleProject/staub-logo_gezmkq.svg",
        statement= "Here at Staub our goal is involve and educate our customers so they may make educated purchases. By offering a carefully curated product range fit for all seasons, we’re able to maintain a small, tight-knit supply chain. We build deep, multi-year relationships with factories and keep in consistent contact—we visit them, they visit us. In addition to conducting our own audits when necessary, we accept third-party, mutually recognized standards to reduce audit fatigue at factories and ensure safe, lawful, humane, and ethical manufacturing practices.",
        warehouse_location= "Alsace, France",
        products_sold=200,
        carbon_goal= 0,
        carbon_goal_date= '2025-06-03 16:08:33.882507',
        transparency_score= 2,
        c_footprint_mt= 0,
        signup_date = '2021-06-03 16:08:33.882507',

    )


    db.session.add(demo_company)
    db.session.add(c2)
    db.session.add(c3)
    db.session.add(c4)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the companies table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_companies():
    db.session.execute('TRUNCATE companies RESTART IDENTITY CASCADE;')
    db.session.commit()
