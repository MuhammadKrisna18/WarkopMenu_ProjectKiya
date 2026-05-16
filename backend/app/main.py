from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routes.admin import router as admin_router
from app.routes.menu import router as menu_router

from app.database import engine
from app.database import Base

from app.models.admin import Admin
from app.models.menu import Menu

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(admin_router)
app.include_router(menu_router)

@app.get("/")
def root():
    return {
        "message": "Warkop Menu API Running"
    }