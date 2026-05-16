from fastapi import APIRouter
from fastapi import Depends
from fastapi import UploadFile
from fastapi import File
from fastapi import Form
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import SessionLocal

from app.models.menu import Menu

import shutil
import uuid
import os

router = APIRouter(
    prefix="/menu",
    tags=["Menu"]
)

UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

@router.post("/create")
def create_menu(
    name: str = Form(...),
    description: str = Form(...),
    total_stock: int = Form(...),
    additional_menu: str = Form(None),
    image: UploadFile = File(None),
    db: Session = Depends(get_db)
):

    image_filename = None

    if image:
        file_extension = image.filename.split(".")[-1]

        image_filename = (
            f"{uuid.uuid4()}.{file_extension}"
        )

        image_path = os.path.join(
            UPLOAD_DIR,
            image_filename
        )

        with open(image_path, "wb") as buffer:
            shutil.copyfileobj(
                image.file,
                buffer
            )

    new_menu = Menu(
        name=name,
        image=image_filename,
        description=description,
        total_stock=total_stock,
        additional_menu=additional_menu
    )

    db.add(new_menu)

    db.commit()

    db.refresh(new_menu)

    return {
        "message": "Menu created successfully"
    }

@router.get("")
def get_all_menu(
    db: Session = Depends(get_db)
):
    menus = db.query(Menu).all()

    return menus

@router.post("/buy/{menu_id}")
def buy_menu(
    menu_id: int,
    qty: int = Form(...),
    db: Session = Depends(get_db)
):

    menu = db.query(Menu).filter(
        Menu.id == menu_id
    ).first()

    if not menu:
        raise HTTPException(
            status_code=404,
            detail="Menu tidak ditemukan"
        )

    if menu.total_stock < qty:
        raise HTTPException(
            status_code=400,
            detail="Stock tidak cukup"
        )

    menu.total_stock -= qty

    db.commit()

    return {
        "message": "Pembelian berhasil",
        "remaining_stock": menu.total_stock
    }

@router.put("/edit/{menu_id}")
def edit_menu(
    menu_id: int,
    name: str = Form(...),
    description: str = Form(...),
    additional_menu: str = Form(None),
    db: Session = Depends(get_db)
):

    menu = db.query(Menu).filter(
        Menu.id == menu_id
    ).first()

    if not menu:
        raise HTTPException(
            status_code=404,
            detail="Menu tidak ditemukan"
        )

    menu.name = name
    menu.description = description
    menu.additional_menu = additional_menu

    db.commit()

    return {
        "message": "Menu berhasil diupdate"
    }

@router.put("/add-stock/{menu_id}")
def add_stock(
    menu_id: int,
    stock: int = Form(...),
    db: Session = Depends(get_db)
):

    menu = db.query(Menu).filter(
        Menu.id == menu_id
    ).first()

    if not menu:
        raise HTTPException(
            status_code=404,
            detail="Menu tidak ditemukan"
        )

    menu.total_stock += stock

    db.commit()

    return {
        "message": "Stock berhasil ditambahkan",
        "total_stock": menu.total_stock
    }