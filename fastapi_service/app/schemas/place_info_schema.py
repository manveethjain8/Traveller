from pydantic import BaseModel

class Coordinates(BaseModel):
    lat: float | None
    lon: float | None


class FactsSchema(BaseModel):
    country: str | None
    state: str | None
    population: int | None

class PlaceResponse(BaseModel): 
    name: str
    description: str
    summary: str
    coordinates: Coordinates
    facts: FactsSchema

