from pydantic import BaseModel, HttpUrl, Field
from typing import List

class MapResponse(BaseModel):
    map_url: HttpUrl

class Coordinates(BaseModel):
    lat: float = Field(..., alias="latitude")
    lng: float = Field(..., alias="longitude")

    class Config:
        populate_by_name = True

class Summary(BaseModel):
    distance: float
    duration: float

class Geometry(BaseModel):
    type: str
    coordinates: List[List[float]]

class Properties(BaseModel):
    summary: Summary

class Features(BaseModel):
    geometry: Geometry
    properties: Properties

class RouteGeoJSON(BaseModel):
    type: str
    features: List[Features]

class RouteRequest(BaseModel):
    source: Coordinates
    destination: Coordinates