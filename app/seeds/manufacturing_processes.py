from app.models import db, Manufacturing_Process


def seed_manufacturing_processes():
    process1 = Manufacturing_Process(
        name="Apparel-Cut and Sew",
        weight = 2
    )

    process2 = Manufacturing_Process(
        name="Footwear-Manufacture",
        weight = 9.48
    )

    process3 = Manufacturing_Process(
        name="Cookware-Cast Iron",
        weight = 5.67
    )

    db.session.add(process1)
    db.session.add(process2)
    db.session.add(process3)

    db.session.commit()



def undo_manufacturing_processes():
    db.session.execute('TRUNCATE manufacturing_processes RESTART IDENTITY CASCADE;')
    db.session.commit()
