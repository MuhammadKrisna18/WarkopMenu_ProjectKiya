from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text

from app.database import Base

class Menu(Base):
    __tablename__ = "menus"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )

    image = Column(
        String,
        nullable=True
    )

    description = Column(
        Text,
        nullable=False
    )

    total_stock = Column(
        Integer,
        nullable=False
    )

    additional_menu = Column(
        Text,
        nullable=True
    )