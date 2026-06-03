from .db import db

class Country_Grid(db.Model):
    __tablename__ = 'country_grids'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    electricity = db.Column(db.Float)

    factories = db.relationship("Factory", back_populates="country_grid")


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "electricity": self.electricity
        }
