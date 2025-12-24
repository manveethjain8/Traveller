from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    OPENCAGE_API_KEY = os.getenv("OPENCAGE_API_KEY")
    UNSPLASH_API_KEY = os.getenv("UNSPLASH_API_KEY")

settings = Settings()