from fastapi import APIRouter, HTTPException
from app.schemas.images_schema import ImageResonse
from app.services.images_service import ImageService

router = APIRouter(tags=['Image Service'])

image_service = ImageService()

@router.get("/image/{place}", response_model=ImageResonse)
async def get_images(place: str):
    try:
        images_list =  await image_service.search_images(place)
        return {
            "query": place,
            "images": images_list
        }
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))