from fastapi import APIRouter

router = APIRouter()

@router.get("/members")
async def pullAllMembers():
    pass

@router.get("/members/{member_id}")
async def pullMember(member_id : str | int):
    pass

@router.patch("/members/{member_id}")
async def patchMember(member_id : str | int):
    pass

@router.delete("/members/{member_id}")
async def deleteMember(member_id : str | int):
    pass

@router.post("/members")
async def postMember():
    pass