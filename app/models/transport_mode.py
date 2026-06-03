from .db import db


class Transport_Mode(db.Model):
    __tablename__ = "transport_modes"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    weight = db.Column(db.Float)

    products = db.relationship("Product", back_populates="transport_mode")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "weight": self.weight
        }
