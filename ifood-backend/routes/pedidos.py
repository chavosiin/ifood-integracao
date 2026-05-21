from fastapi import APIRouter, Query

from services.pedidos_service import (
    listar_pedidos,
    criar_pedido_simulado
)

from routes.websocket import avisar_clientes_novo_pedido
from schemas.pedido_schema import PedidoSchema, PedidoSimuladoResponse

router = APIRouter(
    prefix="/pedidos",
    tags=["Pedidos"]
)


@router.get("/", response_model=list[PedidoSchema])
def buscar_pedidos(
    codfilial: str = Query(..., description="Código da filial WinThor")
):
    return listar_pedidos(codfilial)


@router.post("/simular", response_model=PedidoSimuladoResponse)
async def simular_pedido(
    codfilial: str = Query(..., description="Código da filial WinThor")
):
    novo_pedido = criar_pedido_simulado(codfilial)

    await avisar_clientes_novo_pedido()

    return {
        "mensagem": "Pedido simulado criado",
        "pedido": novo_pedido
    }