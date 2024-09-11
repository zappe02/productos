from sqlalchemy import Column , Integer, String , Float
from .database import Base

class Producto(Base):
    __tablename__="productos"

    id = Column(Integer, primary_key=True, index = True)
    nombre = Column(String, index=True)
    descripcion = Column(String, index=True)
    precio = Column(Float)
    cantidad = Column(Integer)