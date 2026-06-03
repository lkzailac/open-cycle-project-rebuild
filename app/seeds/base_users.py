from app.models import db, BaseUser

def seed_base_users():
    u1 = BaseUser(user_id=1)
    u2 = BaseUser(company_id=1)
    u3 = BaseUser(company_id=2)
    u4 = BaseUser(company_id=3)
    u5 = BaseUser(company_id=4)

    db.session.add(u1)
    db.session.add(u2)
    db.session.add(u3)
    db.session.add(u4)
    db.session.add(u5)
    db.session.commit()

def undo_base_users():
    db.session.execute('TRUNCATE base_users RESTART IDENTITY CASCADE;')
    db.session.commit()
