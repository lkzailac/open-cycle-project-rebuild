from app.models import db, Consumer_Use


def seed_consumer_uses():
    use1 = Consumer_Use(
        name = "Cold wash",
        weight = .055
    )

    use2 = Consumer_Use(
        name = "Hand wash",
        weight = .0
    )

    use3 = Consumer_Use(
        name = "Hot wash",
        weight = .08
    )

    use4 = Consumer_Use(
        name = "Dry clean",
        weight = .18
    )

    use5 = Consumer_Use(
        name = "Tumble Dry",
        weight = .61
    )

    use6 = Consumer_Use(
        name = "Dishwasher",
        weight = .12
    )

    db.session.add(use1)
    db.session.add(use2)
    db.session.add(use3)
    db.session.add(use4)
    db.session.add(use5)
    db.session.add(use6)
    db.session.commit()


def undo_consumer_uses():
    db.session.execute('TRUNCATE consumer_uses RESTART IDENTITY CASCADE;')
    db.session.commit()
