from pydantic import BaseModel


class ProductCreate(BaseModel):
    name: str
    photo_url: str
    company_id: int
    product_category: str
    compArray: list[int] | None = None
    manufacturing_process_id: int
    product_weight_g: float
    package_weight_g: float
    factory_id: int
    unit: str
    transport_mode_id: int
    useArray: list[int] | None = None
    number_of_cycles: int
    returnable: bool
    product_returned_percent: float = 0
    product_recycled_percent: float = 0


class ProductUpdate(BaseModel):
    name: str | None = None
    photo_url: str | None = None
    product_category: str | None = None
    compArray: list[int] | None = None
    manufacturing_process_id: int | None = None
    product_weight_g: float | None = None
    package_weight_g: float | None = None
    factory_id: int | None = None
    unit: str | None = None
    transport_mode_id: int | None = None
    useArray: list[int] | None = None
    number_of_cycles: int | None = None
    returnable: bool | None = None
    product_returned_percent: float | None = None
    product_recycled_percent: float | None = None
