from .db import db

class Manufacturing_Process(db.Model):
    __tablename__ = 'manufacturing_processes'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    weight = db.Column(db.Float)

    products = db.relationship("Product", back_populates="manufacturing_process")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "weight": self.weight
        }
