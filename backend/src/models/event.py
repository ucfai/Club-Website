from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Event_resources(BaseModel):
    youtube_link: Optional[str] = None
    colab_link: Optional[str] = None

# used to create a new event class
class Events(BaseModel):
    event_name: str             #name of event
    event_time: datetime        #time of event
    current_event: bool         #event or no event
    
    # optional -------
    event_description: Optional[str] = None             #event description
    event_hosts: Optional[list[str]] = None             #hosts of event
    event_resources: Optional[Event_resources] = None   #resources of event (youtube and/or colab)
