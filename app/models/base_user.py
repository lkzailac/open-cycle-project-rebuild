from .db import db
from flask_login import UserMixin

class BaseUser(db.Model, UserMixin):
  __tablename__ = 'base_users'

  id = db.Column(db.Integer, primary_key = True)
  company_id = db.Column(db.Integer, db.ForeignKey("companies.id"))
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

  # company = db.relationship("Company", backref="base_user", uselist=False)
  # user = db.relationship("User", backref="base_user", uselist=False)



#   username = db.Column(db.String(40), nullable = False, unique = True)
#   email = db.Column(db.String(255), nullable = False, unique = True)
#   hashed_password = db.Column(db.String(255), nullable = False)
