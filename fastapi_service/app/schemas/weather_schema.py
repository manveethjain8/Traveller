from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Coordinates(BaseModel):
    lon: float
    lat: float

class Weather(BaseModel):
    id: int
    main: str
    description: str
    icon: str

class Main(BaseModel):
    temp: float
    feels_like: float
    temp_min: float
    temp_max: float
    pressure: float
    humidity: float
    sea_level: Optional[float] = None
    grd_level: Optional[float] = None

class Wind(BaseModel):
    speed: float
    deg: Optional[float] = None
    gust: Optional[float] = None

class Rain(BaseModel):
    one_h: float

class Clouds(BaseModel):
    all: float

class Sys(BaseModel):
    type: Optional[int] = None
    id: Optional[int] = None
    country: str
    sunrise: int
    sunset: int

class WeatherResponse(BaseModel):
    coordinates: Coordinates
    weather: List[Weather]
    base: str
    main: Main
    visibility: float
    wind: Wind
    rain: Optional[Rain] = None
    clouds: Clouds
    date: datetime
    sys: Sys
    timezone: int
    id: int
    name: str
    cod: int