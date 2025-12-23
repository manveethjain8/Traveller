from fastapi import FastAPI
from app.api.v1.embedding_routes import router as embedding_router
from app.api.v1.geocode_routes import router as geocode_router

app = FastAPI(
    title="Emedding Service",
    description="Microservice for generating text embeddings for posts",
    version="1.0.0"
)

app.include_router(embedding_router, prefix='/api/v1')
app.include_router(geocode_router, prefix="/api/v1")