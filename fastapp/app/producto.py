from sqlalchemy.orm import Session
from . import models , schemas

def get_producto(db: Session, productoid:int):
    return db.query(models.Producto).filter(models.Producto.id == productoid).first()

def get_productos(db: Session, skip: int=0, limit: int=10):
    return db.query(models.Producto).offset(skip).limit(limit).all()

def create_producto(db: Session, producto: schemas.CrearProducto):
    db_producto = models.Producto(**producto.dict())
    db.add(db_producto)
    db.commit()
    db.refresh(db_producto)
    return db_producto

def delete_producto(db: Session, productoid: int):
    producto = db.query(models.Producto).filter(models.Producto.id == productoid).first()
    if producto:
        db.delete(producto)
        db.commit()
        return producto  # Retorna el producto eliminado
    return None