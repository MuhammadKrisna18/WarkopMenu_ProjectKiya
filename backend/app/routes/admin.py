from fastapi import APIRouter
from app.schemas.admin import AdminLogin

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)

@router.post("/login")
def login(data: AdminLogin):
    return {
        "message": "Login endpoint ready",
        "data": data
    }