import httpx
from app.core.config import settings
from datetime import datetime


class WeatherService:
    def __init__(self):
        self.url = "https://api.openweathermap.org/data/2.5"

    async def weatherInfo(self, lat: float, lon: float) -> dict:
        complete_url = f"{self.url}/weather"

        params = {
            "lat": lat,
            "lon": lon,
            "units": "metric",
            "appid": settings.OPEN_WEATHER_API_KEY
        }

        async with httpx.AsyncClient() as client:
            response = await client.get(complete_url, params=params)

        if response.status_code != 200:
            raise ValueError(f"Weather Error: {response.status_code}")
        
        data = response.json()

        return {
            "coordinates": {
                "lon": data["coord"]["lon"],
                "lat": data["coord"]["lat"]
            },
            "weather": data["weather"],
            "base": data["base"],
            "main": data["main"],
            "visibility": data["visibility"],
            "wind": data["wind"],
            "rain": data.get("rain"),
            "clouds": data["clouds"],
            "date": datetime.fromtimestamp(data["dt"]),
            "sys": data["sys"],
            "timezone": data["timezone"],
            "id": data["id"],
            "name": data["name"],
            "cod": data["cod"]
        }