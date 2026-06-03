from app.models import db, Country_Grid


def seed_country_grids():
    grid1 = Country_Grid(
        name='China grid',
        electricity = .63
    )

    grid2 = Country_Grid(
        name='US grid',
        electricity = .43
    )

    grid3 = Country_Grid(
        name='Vietnam grid',
        electricity = .78
    )

    grid4 = Country_Grid(
        name='Peru grid',
        electricity = .50
    )

    db.session.add(grid1)
    db.session.add(grid2)
    db.session.add(grid3)
    db.session.add(grid4)

    db.session.commit()

def undo_country_grids():
    db.session.execute('TRUNCATE country_grids RESTART IDENTITY CASCADE;')
    db.session.commit()
