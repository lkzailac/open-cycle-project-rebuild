from .db import db

class Factory(db.Model):
    __tablename__ = 'factories'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    location = db.Column(db.String)
    country_grid_id = db.Column(db.Integer, db.ForeignKey("country_grids.id"))

    country_grid = db.relationship("Country_Grid", back_populates="factories")
    products = db.relationship("Product", back_populates='factory')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "location": self.location,
            "country_grid_id": self.country_grid_id
        }
