import httpx
from app.core.config import settings

class ImageService:
    def __init__(self):
        self.base_url = "https://api.unsplash.com/search/photos"

    async def search_images(self, place: str, limit: int = 10):
        params = {
            "query": place,
            "per_page": limit,
            "orientation": "landscape",
            "client_id": settings.UNSPLASH_API_KEY
        }

        async with httpx.AsyncClient() as client:
            response = await client.get(self.base_url, params=params)

        if response.status_code != 200:
            raise ValueError("Failed to fetch images from Unsplash")
    
        data = response.json()

        return[
            {
                "url": (
                    photo["urls"]["full"] or photo["urls"]["regular"] or photo["urls"]["small"]
                ),
                "width": photo.get("width"),
                "height": photo.get("height"),
                "description": photo.get("alt_description"),
                "source": "Unsplash"
            }
            for photo in data.get("results", [])
        ]
        
