from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter()

clientes_conectados = []


@router.websocket("/ws/pedidos")
async def websocket_pedidos(websocket: WebSocket):

    await websocket.accept()

    clientes_conectados.append(websocket)

    try:

        while True:

            await websocket.receive_text()

    except WebSocketDisconnect:

        clientes_conectados.remove(websocket)


async def notificar_novo_pedido(mensagem: str):

    for cliente in clientes_conectados:

        try:

            await cliente.send_text(mensagem)

        except:
            pass
