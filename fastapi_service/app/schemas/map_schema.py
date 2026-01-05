from pydantic import BaseModel, HttpUrl
from typing import List, Dict, Any

class MapResponse(BaseModel):
    map_url: HttpUrl

class Coordinates(BaseModel):
    lat: float
    lng: float

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