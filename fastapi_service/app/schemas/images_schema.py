from pydantic import BaseModel, Field
from typing import Optional, List

class ImageSchema(BaseModel):
    url: str
    width: Optional[int] = None
    height: Optional[int] = None
    description: Optional[str] = None
    source: str = "Unsplash"

class ImageResonse(BaseModel):
    query: str
    images: List[ImageSchema] = Field(default_factory=list)
