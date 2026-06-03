from app.models import db, Component, Product


def seed_component_table():

    # Nike's products
    outsole = Component.query.get(1)
    lining = Component.query.get(2)
    leather = Component.query.get(3)
    laces = Component.query.get(4)

    prod1 = Product.query.get(1)
    prod1.components.append(outsole)
    prod1.components.append(lining)
    prod1.components.append(leather)
    prod1.components.append(laces)

    prod2 = Product.query.get(2)
    prod2.components.append(outsole)
    prod2.components.append(lining)
    prod2.components.append(leather)
    prod2.components.append(laces)

    prod3 = Product.query.get(3)
    prod3.components.append(outsole)
    prod3.components.append(lining)
    prod3.components.append(leather)
    prod3.components.append(laces)

    prod4 = Product.query.get(4)
    prod4.components.append(outsole)
    prod4.components.append(lining)
    prod4.components.append(leather)
    prod4.components.append(laces)

    # Demo's products
    cotton = Component.query.get(5)
    rivet = Component.query.get(6)
    denim = Component.query.get(7)

    prod5 = Product.query.get(5)
    prod5.components.append(cotton)

    prod6 = Product.query.get(6)
    prod6.components.append(rivet)
    prod6.components.append(denim)

    prod7 = Product.query.get(7)
    prod7.components.append(cotton)
    prod7.components.append(laces)

    prod8 = Product.query.get(8)
    prod8.components.append(cotton)

    # Zara's products
    poly_weave = Component.query.get(9)
    poly_knit = Component.query.get(8)

    prod9 = Product.query.get(9)
    prod9.components.append(poly_knit)

    prod10 = Product.query.get(10)
    prod10.components.append(cotton)

    prod11 = Product.query.get(11)
    prod11.components.append(poly_weave)

    # Staub
    iron = Component.query.get(10)
    handle = Component.query.get(11)
    ceramic = Component.query.get(12)

    prod12 = Product.query.get(12)
    prod12.components.append(iron)
    prod12.components.append(handle)

    prod13 = Product.query.get(13)
    prod13.components.append(ceramic)

    prod14 = Product.query.get(14)
    prod14.components.append(ceramic)


    db.session.add(prod1)
    db.session.add(prod2)
    db.session.add(prod3)
    db.session.add(prod4)
    db.session.add(prod5)
    db.session.add(prod6)
    db.session.add(prod7)
    db.session.add(prod8)
    db.session.add(prod9)
    db.session.add(prod10)
    db.session.add(prod11)
    db.session.add(prod12)
    db.session.add(prod13)
    db.session.add(prod14)
    db.session.commit()


def undo_component_table():
    db.session.execute('TRUNCATE component_table RESTART IDENTITY')
    db.session.commit()
