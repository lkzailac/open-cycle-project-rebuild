from datetime import datetime, timezone
from typing import TYPE_CHECKING

from sqlalchemy import String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from api.database import Base

if TYPE_CHECKING:
    from api.models.company_profile import CompanyProfile


class Account(Base):
    __tablename__ = "accounts"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    # 'user' for consumers, 'company' for company admins
    role: Mapped[str] = mapped_column(String(20), nullable=False)
    # consumers only
    username: Mapped[str | None] = mapped_column(String(40), unique=True)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())

    company_profile: Mapped["CompanyProfile | None"] = relationship(
        back_populates="account", uselist=False
    )

    def to_dict(self) -> dict:
        base = {"id": self.id, "email": self.email, "role": self.role}
        if self.role == "user":
            base["username"] = self.username
        if self.role == "company" and self.company_profile:
            base.update(self.company_profile.to_dict())
        return base
