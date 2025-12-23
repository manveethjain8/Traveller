from fastapi import APIRouter
from app.schemas.embedding_schema import EmbeddingRequest, EmbeddingResponse
from app.services.embedding_service import EmbeddingService

router = APIRouter(tags = ["Embedding Service"])

embedding_service = EmbeddingService()


@router.post("/embed", response_model=EmbeddingResponse)
async def generate_embedding(payload: EmbeddingRequest):
    embedding = embedding_service.embed_text(payload.text)
    return {"embedding" : embedding}
