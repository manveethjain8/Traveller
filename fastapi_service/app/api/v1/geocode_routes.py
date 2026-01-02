from fastapi import APIRouter, HTTPException
from app.schemas.geocode_schema import GeocodeResponse
from app.services.geocode_service import GeocodeService

router = APIRouter(tags=["Geocoding Service"])

geocode_service = GeocodeService()

@router.get("/geocode/{place}", response_model=GeocodeResponse)
async def get_coordinates(place: str):
    try: 
        return await geocode_service.search_coordinates(place)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))