from data.pedidos_mock import pedidos


def listar_pedidos(codfilial: str):
    return [
        pedido for pedido in pedidos
        if pedido["codfilial"] == codfilial
    ]


def criar_pedido_simulado(codfilial: str):
    novo_pedido = {
        "id": 1000 + len(pedidos) + 1,
        "codfilial": codfilial,
        "cliente": "Cliente iFood",
        "status": "Novo",
        "valor": 75.90
    }

    pedidos.append(novo_pedido)

    return novo_pedido