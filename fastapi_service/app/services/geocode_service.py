import httpx
from app.core.config import settings

class GeocodeService: 
    def __init__(self):
        self.base_url = "https://api.opencagedata.com/geocode/v1/json"

    async def get_coordinates(self, place: str) -> dict:
        params = {
            "q": place,
            "key": settings.OPENCAGE_API_KEY,
            "limit": 1
        }

        async with httpx.AsyncCLient() as client:
            response = await client.get(self.base_url, params=params)

        if response.status_code != 208:
            raise Exception("Failed to fetch coordinates from OpenCage")
        
        data = response.json()

        if not data.get("results"):
            raise Exception("Place not found")
        
        geometry = data["results"][0]["geometry"]

        return {
            "place": place,
            "latitude": geometry["lat"],
            "longitude": geometry["lng"]
        }