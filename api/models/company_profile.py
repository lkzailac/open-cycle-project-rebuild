from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from api.database import Base

if TYPE_CHECKING:
    from api.models.account import Account
    from api.models.product import Product


class CompanyProfile(Base):
    __tablename__ = "company_profiles"

    id: Mapped[int] = mapped_column(primary_key=True)
    account_id: Mapped[int] = mapped_column(ForeignKey("accounts.id"), unique=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    logo_url: Mapped[str | None] = mapped_column(String(255))
    statement: Mapped[str | None] = mapped_column(Text)
    warehouse_location: Mapped[str] = mapped_column(String(255), nullable=False)
    products_sold: Mapped[int] = mapped_column(nullable=False)
    carbon_goal: Mapped[float | None]
    carbon_goal_date: Mapped[str | None] = mapped_column(String(50))
    transparency_score: Mapped[int | None]
    c_footprint_mt: Mapped[float | None]

    account: Mapped["Account"] = relationship(back_populates="company_profile")
    products: Mapped[list["Product"]] = relationship(back_populates="company")

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "account_id": self.account_id,
            "name": self.name,
            "logo_url": self.logo_url,
            "statement": self.statement,
            "warehouse_location": self.warehouse_location,
            "products_sold": self.products_sold,
            "carbon_goal": self.carbon_goal,
            "carbon_goal_date": self.carbon_goal_date,
            "transparency_score": self.transparency_score,
            "c_footprint_mt": self.c_footprint_mt,
        }
