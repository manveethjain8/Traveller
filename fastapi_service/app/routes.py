from fastapi import APIRouter
from .models import EmbeddingRequest, EmbeddingResponse
from .embeddings import embed_text

router = APIRouter(tags = ["Embedding Service"])

@router.get("/health")
async def health_check():
    return {"status" : "OK"}

@router.post("/embed", response_model=EmbeddingResponse)
async def generate_embedding(payload: EmbeddingRequest):
    embedding = embed_text(payload.text)
    return {"embedding" : embedding}
