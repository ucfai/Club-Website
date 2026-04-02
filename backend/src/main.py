from fastapi import FastAPI
from src.database.database import db
from src.services.event import events_router

app = FastAPI()

app.include_router(events_router) # adds the events router to the app (to be seen)

@app.get("/")
async def testing():
    return {"message": "Server Running..."}

# testing db connection
@app.get("/db_testing")
async def db_testing():
    try:
        await db.command("ping")
        return {"status": 200, "message": "Conneted to DB"}
    except Exception as e:
        return {"status": 500, "message": str(e)}