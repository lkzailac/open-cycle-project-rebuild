from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from api.database import Base

if TYPE_CHECKING:
    from api.models.product import Product


class CountryGrid(Base):
    __tablename__ = "country_grids"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    electricity: Mapped[float]

    factories: Mapped[list["Factory"]] = relationship(back_populates="country_grid")

    def to_dict(self) -> dict:
        return {"id": self.id, "name": self.name, "electricity": self.electricity}


class Factory(Base):
    __tablename__ = "factories"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    location: Mapped[str | None] = mapped_column(String(100))
    country_grid_id: Mapped[int] = mapped_column(ForeignKey("country_grids.id"))

    country_grid: Mapped["CountryGrid"] = relationship(back_populates="factories")
    products: Mapped[list["Product"]] = relationship(back_populates="factory")

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "location": self.location,
            "country_grid_id": self.country_grid_id,
        }


class ManufacturingProcess(Base):
    __tablename__ = "manufacturing_processes"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    weight: Mapped[float]

    products: Mapped[list["Product"]] = relationship(back_populates="manufacturing_process")

    def to_dict(self) -> dict:
        return {"id": self.id, "name": self.name, "weight": self.weight}


class TransportMode(Base):
    __tablename__ = "transport_modes"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    weight: Mapped[float]

    products: Mapped[list["Product"]] = relationship(back_populates="transport_mode")

    def to_dict(self) -> dict:
        return {"id": self.id, "name": self.name, "weight": self.weight}


class Component(Base):
    __tablename__ = "components"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    material: Mapped[str | None] = mapped_column(String(100))
    weight_g: Mapped[float]
    total_used: Mapped[int | None]
    waste_recycled: Mapped[bool | None]
    material_recycled_percent: Mapped[float | None]

    products: Mapped[list["Product"]] = relationship(
        secondary="component_product", back_populates="components"
    )

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "material": self.material,
            "weight_g": self.weight_g,
            "total_used": self.total_used,
            "waste_recycled": self.waste_recycled,
            "material_recycled_percent": self.material_recycled_percent,
        }


class ConsumerUse(Base):
    __tablename__ = "consumer_uses"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    weight: Mapped[float]

    products: Mapped[list["Product"]] = relationship(
        secondary="use_product", back_populates="consumer_uses"
    )

    def to_dict(self) -> dict:
        return {"id": self.id, "name": self.name, "weight": self.weight}
