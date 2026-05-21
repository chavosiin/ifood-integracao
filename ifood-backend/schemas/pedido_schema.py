from pydantic import BaseModel
from typing import Literal


class PedidoSchema(BaseModel):
    id: int
    codfilial: str
    cliente: str
    status: Literal[
        "Novo",
        "Em preparo",
        "Finalizado",
        "Cancelado"
    ]
    valor: float


class PedidoSimuladoResponse(BaseModel):
    mensagem: str
    pedido: PedidoSchema