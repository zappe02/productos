from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas
from .producto import get_producto, create_producto as create_producto_db, delete_producto as delete_producto_db , get_productos
from .database import get_db

router = APIRouter()

@router.post("/productos/", response_model=schemas.Producto)
def create_producto(producto: schemas.CrearProducto, db: Session = Depends(get_db)):
    return create_producto_db(db=db, producto=producto)  # Cambia a create_producto_db

@router.get("/productos/{productoid}", response_model=schemas.Producto)
def read_producto(productoid: int, db: Session = Depends(get_db)):    
    db_producto = get_producto(db=db, productoid=productoid)
    if db_producto is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return db_producto

@router.get("/productos/", response_model=list[schemas.Producto])
def read_productos(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    productos = get_productos(db, skip=skip, limit=limit)
    return productos

@router.delete("/productos/{productoid}", response_model=schemas.Producto)
def delete_producto(productoid: int, db: Session = Depends(get_db)):
    producto = delete_producto_db(db=db, productoid=productoid)  # Usa el nombre correcto aquí
    if producto is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return producto


