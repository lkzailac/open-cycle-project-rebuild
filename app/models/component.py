from .db import db
from .product import component_table


class Component(db.Model):
    __tablename__ = "components"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    material = db.Column(db.String)
    weight_g = db.Column(db.Float)
    total_used = db.Column(db.Integer)
    waste_recycled = db.Column(db.Boolean)
    material_recycled_percent = db.Column(db.Float)

    products = db.relationship( "Product", secondary=component_table, back_populates="components")


    def to_dict(self):
        return {
           "id": self.id,
            "name": self.name,
            "material": self.material,
            "weight_g": self.weight_g,
            "total_used": self.total_used,
            "waste_recycled": self.waste_recycled,
            "material_recycled_percent": self.material_recycled_percent
        }
