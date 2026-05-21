from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter()

clientes_websocket = []

@router.websocket("/ws/pedidos")
async def websocket_pedidos(websocket: WebSocket):
    await websocket.accept()
    clientes_websocket.append(websocket)

    try:
        while True:
            await websocket.receive_text()

    except WebSocketDisconnect:
        clientes_websocket.remove(websocket)


async def avisar_clientes_novo_pedido():
    for cliente in clientes_websocket:
        await cliente.send_json({
            "tipo": "NOVO_PEDIDO",
            "mensagem": "Novo pedido recebido"
        })