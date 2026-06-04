from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from api.auth.jwt import create_access_token
from api.auth.password import hash_password, verify_password
from api.dependencies.auth import get_current_account
from api.dependencies.db import get_db
from api.models.account import Account
from api.models.company_profile import CompanyProfile
from api.schemas.auth import (
    CompanyLoginRequest,
    CompanyRegisterRequest,
    TokenResponse,
    UserLoginRequest,
    UserRegisterRequest,
)

router = APIRouter()


@router.get("/me")
async def me(account: Account = Depends(get_current_account)) -> dict:
    return account.to_dict()


@router.post("/login/user", response_model=TokenResponse)
async def login_user(data: UserLoginRequest, db: AsyncSession = Depends(get_db)):
    stmt = (
        select(Account)
        .where(Account.email == data.email, Account.role == "user")
    )
    account = (await db.execute(stmt)).scalar_one_or_none()
    if not account or not verify_password(data.password, account.hashed_password):
        raise HTTPException(401, detail={"errors": ["Invalid email or password"]})
    token = create_access_token(account.id, account.role)
    return TokenResponse(access_token=token, account=account.to_dict())


@router.post("/login/company", response_model=TokenResponse)
async def login_company(data: CompanyLoginRequest, db: AsyncSession = Depends(get_db)):
    stmt = (
        select(Account)
        .options(selectinload(Account.company_profile))
        .join(CompanyProfile, Account.id == CompanyProfile.account_id)
        .where(CompanyProfile.name == data.name, Account.role == "company")
    )
    account = (await db.execute(stmt)).scalar_one_or_none()
    if not account or not verify_password(data.password, account.hashed_password):
        raise HTTPException(401, detail={"errors": ["Invalid credentials"]})
    token = create_access_token(account.id, account.role)
    return TokenResponse(access_token=token, account=account.to_dict())


@router.post("/logout")
async def logout():
    # JWT is stateless — client discards the token
    return {"message": "Logged out"}


@router.post("/register/user", response_model=TokenResponse, status_code=201)
async def register_user(data: UserRegisterRequest, db: AsyncSession = Depends(get_db)):
    existing = (await db.execute(
        select(Account).where(Account.email == data.email)
    )).scalar_one_or_none()
    if existing:
        raise HTTPException(400, detail={"errors": ["email : Email already registered"]})

    account = Account(
        email=data.email,
        username=data.username,
        hashed_password=hash_password(data.password),
        role="user",
    )
    db.add(account)
    await db.flush()   # populates account.id — no race condition
    await db.commit()
    await db.refresh(account)

    token = create_access_token(account.id, "user")
    return TokenResponse(access_token=token, account=account.to_dict())


@router.post("/register/company", response_model=TokenResponse, status_code=201)
async def register_company(data: CompanyRegisterRequest, db: AsyncSession = Depends(get_db)):
    existing = (await db.execute(
        select(Account).where(Account.email == data.admin_email)
    )).scalar_one_or_none()
    if existing:
        raise HTTPException(400, detail={"errors": ["email : Email already registered"]})

    account = Account(
        email=data.admin_email,
        hashed_password=hash_password(data.password),
        role="company",
    )
    db.add(account)
    await db.flush()   # populates account.id before profile insert

    profile = CompanyProfile(
        account_id=account.id,
        name=data.name,
        logo_url=data.logo_url,
        statement=data.statement,
        warehouse_location=data.warehouse_location,
        products_sold=data.products_sold,
        carbon_goal=data.carbon_goal,
        carbon_goal_date=data.carbon_goal_date,
    )
    db.add(profile)
    await db.commit()
    await db.refresh(account)
    await db.refresh(profile)
    account.company_profile = profile

    token = create_access_token(account.id, "company")
    return TokenResponse(access_token=token, account=account.to_dict())
