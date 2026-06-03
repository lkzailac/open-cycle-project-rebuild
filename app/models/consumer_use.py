from .db import db
from .product import use_table

class Consumer_Use(db.Model):
    __tablename__ = "consumer_uses"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    weight = db.Column(db.Float)

    products = db.relationship("Product", secondary=use_table, back_populates="consumer_uses")


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "weight": self.weight,
        }
