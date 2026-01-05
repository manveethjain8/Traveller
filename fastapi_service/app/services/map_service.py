import httpx
from app.core.config import settings
from app.schemas.map_schema import Coordinates

class MapService:
    def __init__(self):
        self.detailed_route_url = "https://api.openrouteservice.org/v2/directions/driving-car/geojson"
        self.detailed_route_header = {
            "Authorization": settings.OPEN_ROUTE_SERVICE_API_KEY,
            'Content-Type': 'application/json'
        }

    async def get_full_route(self, source: Coordinates, destination: Coordinates) -> dict:
        payload = {
            "coordinates": [
                [source.lng, source.lat],
                [destination.lng, destination.lat]
            ]
        }

        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.post(
                self.detailed_route_url,
                headers=self.detailed_route_header,
                json=payload
            )

        response.raise_for_status()
        return response.json()