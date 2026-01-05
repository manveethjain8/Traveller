from fastapi import FastAPI
from app.api.v1.embedding_routes import router as embedding_router
from app.api.v1.geocode_routes import router as geocode_router
from app.api.v1.images_routes import router as image_router
from app.api.v1.place_info_routes import router as place_info_router
from app.api.v1.weather_routes import router as weather_router
from app.api.v1.map_routes import router as map_router

app = FastAPI(
    title="Python Micro Service",
    description="Microservice for generating text embeddings and geocode",
    version="1.0.0"
)

app.include_router(embedding_router, prefix='/api/v1')
app.include_router(geocode_router, prefix="/api/v1")
app.include_router(image_router, prefix="/api/v1")
app.include_router(place_info_router, prefix="/api/v1")
app.include_router(weather_router, prefix="/api/v1")
app.include_router(map_router, prefix="/api/v1")
