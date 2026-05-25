from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.webhook import router as webhook_router
from core.config import ORIGENS_PERMITIDAS

from routes.pedidos import router as pedidos_router
from routes.websocket import router as websocket_router
from routes.health import router as health_router
from routes.mysql import router as mysql_router
from routes.auth import router as auth_router
from routes.logs import router as logs_router

app = FastAPI(
    title="API Integração iFood WinThor",
    description="Backend FastAPI responsável pela integração entre iFood, MySQL, React e WebSocket.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGENS_PERMITIDAS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pedidos_router)
app.include_router(websocket_router)
app.include_router(health_router)
app.include_router(mysql_router)
app.include_router(auth_router)
app.include_router(logs_router)
app.include_router(webhook_router)


@app.get("/")
def inicio():
    return {
        "mensagem": "API Integração iFood WinThor funcionando",
        "versao": "1.0.0",
        "status": "online"
    }
