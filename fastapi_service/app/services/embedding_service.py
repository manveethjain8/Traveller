from sentence_transformers import SentenceTransformer
from typing import List

class EmbeddingService:
    def __init__(self):
        self.model = SentenceTransformer('all-MiniLM-L6-v2')

    def embed_text(self, text: str) -> List[float]:
        embedding = self.model.encode(
            text,
            normalize_embeddings=True
        )

        return embedding.tolist()