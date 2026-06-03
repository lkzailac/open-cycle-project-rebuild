from app.models import db, Transport_Mode


def seed_transport_modes():
    mode1 = Transport_Mode(
        name = "Air",
        weight = .80
    )

    mode2 = Transport_Mode(
        name = "Ocean",
        weight = .03
    )

    mode3 = Transport_Mode(
        name = "Truck",
        weight = .13
    )

    db.session.add(mode1)
    db.session.add(mode2)
    db.session.add(mode3)
    db.session.commit()


def undo_transport_modes():
    db.session.execute('TRUNCATE transport_modes RESTART IDENTITY CASCADE;')
    db.session.commit()
