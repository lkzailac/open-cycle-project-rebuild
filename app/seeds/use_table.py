from app.models import db, Consumer_Use, Product


def seed_use_table():

    cold = Consumer_Use.query.get(1)
    hand = Consumer_Use.query.get(2)
    hot = Consumer_Use.query.get(3)
    dry_clean = Consumer_Use.query.get(4)
    dry = Consumer_Use.query.get(5)
    dishwasher = Consumer_Use.query.get(6)

    prod1 = Product.query.get(1)
    prod1.consumer_uses.append(cold)

    prod2 = Product.query.get(2)
    prod2.consumer_uses.append(cold)

    prod3 = Product.query.get(3)
    prod3.consumer_uses.append(cold)

    prod4 = Product.query.get(4)
    prod4.consumer_uses.append(cold)

    prod5 = Product.query.get(5)
    prod5.consumer_uses.append(dry_clean)

    prod6 = Product.query.get(6)
    prod6.consumer_uses.append(hot)
    prod6.consumer_uses.append(dry)

    prod7 = Product.query.get(7)
    prod7.consumer_uses.append(hot)

    prod8 = Product.query.get(8)
    prod8.consumer_uses.append(dry_clean)

    prod9 = Product.query.get(9)
    prod9.consumer_uses.append(cold)
    prod9.consumer_uses.append(dry)

    prod10 = Product.query.get(10)
    prod10.consumer_uses.append(hot)
    prod10.consumer_uses.append(dry)

    prod11 = Product.query.get(11)
    prod11.consumer_uses.append(cold)
    prod11.consumer_uses.append(dry)

    prod12 = Product.query.get(12)
    prod12.consumer_uses.append(dishwasher)

    prod13 = Product.query.get(13)
    prod13.consumer_uses.append(dishwasher)

    prod14 = Product.query.get(14)
    prod14.consumer_uses.append(dishwasher)

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


def undo_use_table():
    db.session.execute('TRUNCATE use_table RESTART IDENTITY')
    db.session.commit()
