from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import Mapped, mapped_column, relationship

from api.database import Base

if TYPE_CHECKING:
    from api.models.company_profile import CompanyProfile
    from api.models.lookup import Component, ConsumerUse, Factory, ManufacturingProcess, TransportMode

# Many-to-many association tables
component_product = Table(
    "component_product",
    Base.metadata,
    Column("component_id", Integer, ForeignKey("components.id"), primary_key=True),
    Column("product_id", Integer, ForeignKey("products.id"), primary_key=True),
)

use_product = Table(
    "use_product",
    Base.metadata,
    Column("consumer_use_id", Integer, ForeignKey("consumer_uses.id"), primary_key=True),
    Column("product_id", Integer, ForeignKey("products.id"), primary_key=True),
)


class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str | None] = mapped_column(String(255))
    photo_url: Mapped[str | None] = mapped_column(String(255))
    company_id: Mapped[int] = mapped_column(ForeignKey("company_profiles.id"), nullable=False)
    product_category: Mapped[str | None] = mapped_column(String(100))
    manufacturing_process_id: Mapped[int | None] = mapped_column(ForeignKey("manufacturing_processes.id"))
    product_weight_g: Mapped[float | None]
    package_weight_g: Mapped[float | None]
    factory_id: Mapped[int] = mapped_column(ForeignKey("factories.id"), nullable=False)
    unit: Mapped[str | None] = mapped_column(String(50))
    transport_mode_id: Mapped[int | None] = mapped_column(ForeignKey("transport_modes.id"))
    number_of_cycles: Mapped[int | None]
    returnable: Mapped[bool | None]
    product_returned_percent: Mapped[float | None]
    product_recycled_percent: Mapped[float | None]
    carbon_footprint_kg: Mapped[float | None]

    company: Mapped["CompanyProfile"] = relationship(back_populates="products")
    manufacturing_process: Mapped["ManufacturingProcess | None"] = relationship(back_populates="products")
    factory: Mapped["Factory"] = relationship(back_populates="products")
    transport_mode: Mapped["TransportMode | None"] = relationship(back_populates="products")
    components: Mapped[list["Component"]] = relationship(
        secondary="component_product", back_populates="products"
    )
    consumer_uses: Mapped[list["ConsumerUse"]] = relationship(
        secondary="use_product", back_populates="products"
    )

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "photo_url": self.photo_url,
            "company_id": self.company_id,
            "product_category": self.product_category,
            "manufacturing_process_id": self.manufacturing_process_id,
            "product_weight_g": self.product_weight_g,
            "package_weight_g": self.package_weight_g,
            "factory_id": self.factory_id,
            "unit": self.unit,
            "transport_mode_id": self.transport_mode_id,
            "number_of_cycles": self.number_of_cycles,
            "returnable": self.returnable,
            "product_returned_percent": self.product_returned_percent,
            "product_recycled_percent": self.product_recycled_percent,
            "carbon_footprint_kg": self.carbon_footprint_kg,
            "components": [c.to_dict() for c in self.components],
            "uses": [u.to_dict() for u in self.consumer_uses],
        }

    def calc_footprint(self) -> float:
        sum_materials = sum(c.weight_g for c in self.components)
        manuf = (self.manufacturing_process.weight * 1000) if self.manufacturing_process else 0
        transport = (self.transport_mode.weight * (self.package_weight_g or 0)) if self.transport_mode else 0
        sum_uses = sum(
            u.weight * ((self.product_weight_g or 0) / 1000) * (self.number_of_cycles or 0)
            for u in self.consumer_uses
        )
        eol = (self.product_weight_g or 0) * (1 - ((self.product_recycled_percent or 0) / 100))
        factory_grid = (self.factory.country_grid.electricity * 1000) if self.factory and self.factory.country_grid else 0
        self.carbon_footprint_kg = (sum_materials + manuf + transport + sum_uses + eol + factory_grid) / 1000
        return self.carbon_footprint_kg
