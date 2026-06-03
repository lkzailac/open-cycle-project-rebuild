from app.models import db, Factory

def seed_factories():
    fact1 = Factory(
        name = "Shine Bright",
        location = "Dongguan, China",
        country_grid_id = 1
    )

    fact2 = Factory(
        name = "Stella",
        location = "Chengdu, China",
        country_grid_id = 1
    )

    fact3 = Factory(
        name = "High More",
        location = "Hanoi, Vietnam",
        country_grid_id = 3
    )

    fact4 = Factory(
        name = "Singing Wind",
        location = "Los Angeles, CA",
        country_grid_id = 2
    )

    fact5 = Factory(
        name = "Lightning",
        location = "Lima, Peru",
        country_grid_id = 4
    )

    db.session.add(fact1)
    db.session.add(fact2)
    db.session.add(fact3)
    db.session.add(fact4)
    db.session.add(fact5)

    db.session.commit()


def undo_factories():
    db.session.execute('TRUNCATE factories RESTART IDENTITY CASCADE;')
    db.session.commit()
