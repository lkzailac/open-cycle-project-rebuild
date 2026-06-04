from pydantic import BaseModel, EmailStr


class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str


class CompanyLoginRequest(BaseModel):
    name: str
    admin_email: EmailStr
    password: str


class UserRegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str


class CompanyRegisterRequest(BaseModel):
    name: str
    admin_email: EmailStr
    password: str
    logo_url: str = ""
    statement: str = ""
    warehouse_location: str
    products_sold: int = 0
    carbon_goal: float | None = None
    carbon_goal_date: str | None = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    account: dict
