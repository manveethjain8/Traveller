from fastapi import FastAPI
from .routes import router

app = FastAPI(
    title="Emedding Service",
    description="Microservice for generating text embeddings for posts",
    version="1.0.0"
)

app.include_router(router)