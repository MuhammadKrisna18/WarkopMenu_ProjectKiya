from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import SessionLocal

from app.models.admin import Admin

from app.schemas.admin import (
    AdminLogin,
    AdminCreate
)

from app.auth.password_handler import (
    hash_password,
    verify_password
)

from app.auth.jwt_handler import (
    create_access_token
)

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

@router.post("/create")
def create_admin(
    data: AdminCreate,
    db: Session = Depends(get_db)
):
    existing_admin = db.query(Admin).filter(
        Admin.username == data.username
    ).first()

    if existing_admin:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    hashed_password = hash_password(
        data.password
    )

    new_admin = Admin(
        username=data.username,
        password=hashed_password
    )

    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)

    return {
        "message": "Admin created successfully"
    }

@router.post("/login")
def login_admin(
    data: AdminLogin,
    db: Session = Depends(get_db)
):
    admin = db.query(Admin).filter(
        Admin.username == data.username
    ).first()

    if not admin:
        raise HTTPException(
            status_code=401,
            detail="Invalid username"
        )

    valid_password = verify_password(
        data.password,
        admin.password
    )

    if not valid_password:
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    token = create_access_token({
        "sub": admin.username
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }