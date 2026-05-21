from fastapi import APIRouter

router = APIRouter(
    prefix="/health",
    tags=["Health Check"]
)

@router.get("/")
def health_check():

    return {
        "backend": "online",
        "oracle": "pendente",
        "ifood": "pendente",
        "websocket": "online",
        "status": "ok"
    }