from fastapi import APIRouter, HTTPException
from app.schemas.place_info_schema import PlaceResponse
from app.services.place_info_service import PlaceService
from app.services.geocode_service import GeocodeService

router = APIRouter(tags=['Place information service'])

place_service = PlaceService()
geocodeService = GeocodeService()

@router.get("/place/{place}", response_model=PlaceResponse)
async def get_place_info(place: str):
    try:
        place_wikipedia_summary = await place_service.get_wikipedia_summary(place)
        place_wikidata_info = await place_service.get_wikidata_summary(place)
        coordinates = await geocodeService.search_coordinates(place)
        return {
            "name": place_wikipedia_summary["name"],
            "description": place_wikipedia_summary["description"],
            "summary": place_wikipedia_summary["summary"],
            "coordinates": {
                "lat": coordinates["latitude"] or None,
                "lon": coordinates["longitude"] or None
            },
            "facts": {
                "country": place_wikidata_info["country"] or None,
                "state": place_wikidata_info["state"] or None,
                "population": place_wikidata_info["population"] or None
            }
        }
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))