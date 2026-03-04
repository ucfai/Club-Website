import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

# env variables
MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

# connect to db
client = AsyncIOMotorClient(MONGODB_URL)
db = client[DATABASE_NAME]

# collections within the db
members_collection = db["members"]
projects_collection = db["projects"]
events_collection = db["events"]