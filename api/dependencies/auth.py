import jwt
from fastapi import Depends, HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from api.auth.jwt import decode_token
from api.dependencies.db import get_db
from api.models.account import Account
from api.models.company_profile import CompanyProfile

security = HTTPBearer()


async def get_current_account(
    credentials: HTTPAuthorizationCredentials = Security(security),
    db: AsyncSession = Depends(get_db),
) -> Account:
    try:
        payload = decode_token(credentials.credentials)
    except jwt.ExpiredSignatureError:
        raise HTTPException(401, "Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(401, "Invalid token")

    stmt = (
        select(Account)
        .options(selectinload(Account.company_profile))
        .where(Account.id == int(payload["sub"]))
    )
    account = (await db.execute(stmt)).scalar_one_or_none()
    if not account:
        raise HTTPException(401, "Account not found")
    return account


async def require_company(
    account: Account = Depends(get_current_account),
) -> Account:
    if account.role != "company":
        raise HTTPException(403, "Company account required")
    if not account.company_profile:
        raise HTTPException(403, "Company profile missing")
    return account


async def require_user(
    account: Account = Depends(get_current_account),
) -> Account:
    if account.role != "user":
        raise HTTPException(403, "User account required")
    return account
