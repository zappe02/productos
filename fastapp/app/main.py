from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
from .models import Base
from .router import router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(router)

# Configuración de los orígenes permitidos
origins = [
    "http://localhost:3000",  # Frontend en desarrollo con React
    "http://127.0.0.1:3000",  # Alternativa para localhost
    "http://localhost:5173",  # Vite en el puerto 5173
    "http://127.0.0.1:5173",  # Alternativa para localhost en Vite
    # Puedes agregar más dominios permitidos si es necesario
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permitir solicitudes de estos orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permitir todas las cabeceras
)