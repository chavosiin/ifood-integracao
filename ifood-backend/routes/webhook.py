from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy import text
import json

from database import engine
from services.log_service import registrar_log
from routes.websocket import notificar_novo_pedido

router = APIRouter(
    prefix="/webhook",
    tags=["Webhook iFood"]
)


class EventoIfoodRequest(BaseModel):
    id: str
    orderId: str
    code: str
    codfilial: str = "12"


@router.post("/ifood")
async def receber_evento_ifood(dados: EventoIfoodRequest):

    with engine.begin() as connection:

        connection.execute(
            text("""
                INSERT INTO ifood_eventos (
                    codfilial,
                    event_id,
                    order_id,
                    event_type,
                    json_evento
                )
                VALUES (
                    :codfilial,
                    :event_id,
                    :order_id,
                    :event_type,
                    :json_evento
                )
            """),
            {
                "codfilial": dados.codfilial,
                "event_id": dados.id,
                "order_id": dados.orderId,
                "event_type": dados.code,
                "json_evento": json.dumps(dados.dict())
            }
        )

    registrar_log(
        dados.codfilial,
        "IFOOD_EVENTO",
        "RECEBIDO",
        f"Evento recebido do iFood. Pedido: {dados.orderId}"
    )

    await notificar_novo_pedido(
        f"Novo evento iFood recebido. Pedido: {dados.orderId}"
    )

    return {
        "status": "sucesso",
        "mensagem": "Evento recebido e salvo com sucesso"
    }
