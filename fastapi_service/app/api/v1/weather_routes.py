from fastapi import APIRouter, HTTPException
from app.schemas.weather_schema import WeatherResponse, ForecastResponse
from app.services.weather_service import WeatherService


router = APIRouter(tags=["Weather Information Service"])

weather_service = WeatherService()

@router.get("/weather/{lat}/{lon}", response_model=WeatherResponse)
async def get_weather_info(lat: float, lon: float):
    try:
        weather_info = await weather_service.weatherInfo(lat=lat, lon=lon)
        return weather_info
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    
@router.get("/forecast/{lat}/{lon}", response_model=ForecastResponse)
async def get_weather_info(lat: float, lon: float):
    try:
        forecast_info = await weather_service.forecastInfo(lat=lat, lon=lon)
        return forecast_info
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    
