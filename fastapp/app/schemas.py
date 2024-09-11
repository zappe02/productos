from pydantic import BaseModel

class ProductoBase(BaseModel):
    nombre: str
    descripcion: str
    precio: float
    cantidad: int

class CrearProducto(ProductoBase):
    pass

class Producto(CrearProducto):
    id: int

    class Config:
        from_atributtes = True