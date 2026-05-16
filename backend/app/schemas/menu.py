from pydantic import BaseModel

class MenuResponse(BaseModel):
    id: int
    name: str
    image: str | None
    description: str
    total_stock: int
    customer_limit: int
    additional_menu: str | None

    class Config:
        from_attributes = True