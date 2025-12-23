from pydantic import BaseModel

class GeocodeResponse(BaseModel):
    place: str
    latitude: float
    longitude: float