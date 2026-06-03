from app.models import db, Component


def seed_components():
    comp1 = Component(
        name = "sneaker outsole",
        material = "eva",
        weight_g = 500,
        total_used = 8,
        waste_recycled = False,
        material_recycled_percent = 0
    )

    comp2 = Component(
        name = "Pu lining",
        material = "pu",
        weight_g = 200,
        total_used = 8,
        waste_recycled = True,
        material_recycled_percent = 20
    )

    comp3 = Component(
        name = "Leather Upper",
        material = "cow leather",
        weight_g = 300,
        total_used = 10,
        waste_recycled = True,
        material_recycled_percent = 30
    )

    comp4 = Component(
        name = "Laces",
        material = "cotton",
        weight_g = 50,
        total_used = 18,
        waste_recycled = False,
        material_recycled_percent = 0
    )

    comp5 = Component(
        name = "Cotton",
        material = "cotton",
        weight_g = 200,
        total_used = 6,
        waste_recycled = True,
        material_recycled_percent = 40
    )

    comp6 = Component(
        name = "Rivet",
        material = "aluminium",
        weight_g = 2,
        total_used = 20,
        waste_recycled = True,
        material_recycled_percent = 80
    )

    comp7 = Component(
        name = "Denim",
        material = "denim",
        weight_g = 500,
        total_used = 25,
        waste_recycled = True,
        material_recycled_percent = 20
    )

    comp8 = Component(
        name = "Poly knit",
        material = "polyester",
        weight_g = 200,
        total_used = 37,
        waste_recycled = False,
        material_recycled_percent = 0
    )

    comp9 = Component(
        name = "Poly weave",
        material = "polyester",
        weight_g = 200,
        total_used = 37,
        waste_recycled = False,
        material_recycled_percent = 0
    )

    comp10 = Component(
        name = "Cast Iron body",
        material = "Iron conglomerate",
        weight_g = 5000,
        total_used = 5,
        waste_recycled = True,
        material_recycled_percent = 70
    )

    comp11 = Component(
        name = "handle",
        material = "brass",
        weight_g = 300,
        total_used = 5,
        waste_recycled = True,
        material_recycled_percent = 33
    )

    comp12 = Component(
        name = "body",
        material = "ceramic",
        weight_g = 1000,
        total_used = 12,
        waste_recycled = False,
        material_recycled_percent = 0
    )

    db.session.add(comp1)
    db.session.add(comp2)
    db.session.add(comp3)
    db.session.add(comp4)
    db.session.add(comp5)
    db.session.add(comp6)
    db.session.add(comp7)
    db.session.add(comp8)
    db.session.add(comp9)
    db.session.add(comp10)
    db.session.add(comp11)
    db.session.add(comp12)
    db.session.commit()


def undo_components():
    db.session.execute('TRUNCATE components RESTART IDENTITY CASCADE;')
    db.session.commit()
