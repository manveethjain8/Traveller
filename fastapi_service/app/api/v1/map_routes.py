from fastapi import APIRouter, HTTPException
from app.schemas.map_schema import MapResponse, RouteGeoJSON, RouteRequest
from app.schemas.map_schema import Coordinates
from app.services.map_service import MapService

router = APIRouter(tags=["Routing Information"])

map_service = MapService()

@router.post("/map", response_model=MapResponse)
async def get_map(source: Coordinates, destination: Coordinates) -> MapResponse:
    try:
        map_url = f"https://maps.openrouteservice.org/directions?a={source.lat},{source.lng},{destination.lat},{destination.lng}&b=0&c=0"


        return {
            "map_url": map_url
        }
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.post("/route-map", response_model=RouteGeoJSON)
async def get_route_map(payload: RouteRequest) -> RouteGeoJSON:
    try:
        source = payload.source
        destination = payload.destination
        response = await map_service.get_full_route(source=source, destination=destination)
        return response
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
