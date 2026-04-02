from fastapi import APIRouter, HTTPException
from src.database.database import events_collection
from bson import ObjectId
from src.models.event import Events

events_router = APIRouter()

# this is used to create a event_resources class

# converts from _id -> event_id for less confusion
def helper(serialize):
    serialize['event_id'] = str(serialize['_id'])
    del serialize['_id']
    return serialize

# retrieves all events
@events_router.get("/events")
async def pullAllEvents():
    found = await events_collection.find().to_list(length=None)
    return [helper(f) for f in found]

# pulls specified event :)
@events_router.get("/events/{event_id}")
async def pullEvent(event_id : str | int):
    event = await events_collection.find_one({"_id": ObjectId(event_id)})
    
    if event is None:
        raise HTTPException(status_code=404, detail=f"Event {event_id} not found")
    
    return helper(event)

# updates event
@events_router.patch("/events/{event_id}")
async def patchEvent(event: Events, event_id : str | int):
    event = await events_collection.update_one({"_id": ObjectId(event_id)}, {"$set": event.model_dump()})
    
    if event.matched_count == 0:
        raise HTTPException(status_code=404, detail=f"Event {event_id} not found")
    
    return {"Message": "Event Updated"}

# deletes event
@events_router.delete("/events/{event_id}")
async def deleteEvent(event_id : str | int):
    event = await events_collection.delete_one({"_id": ObjectId(event_id)})
    
    if event.deleted_count == 0:
        raise HTTPException(status_code=404, detail=f"Event {event_id} not found")
    
    return {"Message": "Event Deleted"}
    
# posts new event :O
@events_router.post("/events")
async def postEvent(event: Events):
    new_event = event.model_dump()
    res = await events_collection.insert_one(new_event)
    return {"event_id": str(res.inserted_id)}