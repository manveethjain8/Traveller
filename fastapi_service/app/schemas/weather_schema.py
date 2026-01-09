from pydantic import BaseModel, Field
from typing import List, Optional, Union
from datetime import datetime

class Coordinates(BaseModel):
    lat: float
    lon: float

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
    cod: Union[str, int]

class ForecastMain(BaseModel):
    temp: float
    feels_like: float
    temp_min: float
    temp_max: float
    pressure: float
    humidity: float
    sea_level: Optional[float] = None
    grd_level: Optional[float] = None
    temp_kf: Optional[float] = None

class ForecastRain(BaseModel):
    three_h: Optional[float] = Field(None, alias="3h")

class ForecastSys(BaseModel):
    pod: str

class ForecastList(BaseModel):
    dt: int
    main: ForecastMain
    weather: List[Weather] = Field(default_factory=list)
    clouds: Clouds
    wind: Wind
    visibility: float
    pop: Optional[float] = None
    rain: Optional[ForecastRain] = None
    sys: ForecastSys
    dt_txt: str

class City(BaseModel):
    id: int
    name: str
    coord: Coordinates
    country: Optional[str] = None
    population: int
    timezone: int
    sunrise: int
    sunset: int


class ForecastResponse(BaseModel):
    cod: Union[str, int]
    message: int
    cnt: int
    list: List[ForecastList] = Field(default_factory=list)
    city: City