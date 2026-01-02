import httpx
from app.core.config import settings

class PlaceService:
    def __init__(self):
        self.wikipedia_url = "https://en.wikipedia.org/api/rest_v1/page/summary/"
        self.wikipedia_header = {
            "User-Agent": "TravellerApp/1.0 (contact: 2023ci_manveethhv_a@nie.ac.in)",
            "Accept": "application/json"
        }

        self.wikidata_url = "https://query.wikidata.org/sparql"
        self.wikidata_header = {
            "User-Agent": "TravellerApp/1.0 (contact: 2023ci_manveethhv_a@nie.ac.in)",
            "Accept": "application/sparql+json"
        }

    async def get_wikipedia_summary(self, title: str) -> dict:
        title = title.replace(" ", "_")
        url = f"{self.wikipedia_url}{title}"

        async with httpx.AsyncClient(headers=self.wikipedia_header, timeout=10) as client:
            response = await client.get(url)

        if response.status_code != 200:
           raise ValueError(f"Wikipedia error: {response.status_code}")
        
        data = response.json()

        return {
            "name": data["title"],
            "description": data.get("description", ""),
            "summary": data.get("extract", "")
        }
    
    async def get_wikidata_summary(self, title: str) -> dict:   
        query = f"""
            SELECT ?countryLabel ?stateLabel ?population WHERE {{
            ?place rdfs:label "{title}"@en .
            OPTIONAL {{ ?place wdt:P17 ?country. }}
            OPTIONAL {{ ?place wdt:P131 ?state. }}
            OPTIONAL {{ ?place wdt:P1082 ?population. }}
            SERVICE wikibase:label {{ bd:serviceParam wikibase:language "en". }}
            }}
            LIMIT 1
        """

        async with httpx.AsyncClient(headers=self.wikidata_header, timeout=10) as client:
            response = await client.get(
                self.wikidata_url,
                params={"query": query, "format": "json"}
            )

        if response.status_code != 200:
           raise ValueError(f"Wikidata error: {response.status_code}")
        
        data = response.json()["results"]["bindings"]
        if not data:
            return {"country": None, "state": None, "population": None}
        
        d = data[0]
        
        return {
            "country": d.get("countryLabel", {}).get("value"),
            "state": d.get("stateLabel", {}).get("value"),
            "population": int(float(d["population"]["value"])) if "population" in d else None
        }



