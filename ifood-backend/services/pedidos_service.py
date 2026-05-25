from sqlalchemy import text
from database import engine


def listar_pedidos(codfilial: str):

    with engine.connect() as connection:

        resultado = connection.execute(
            text("""
                SELECT
                    id,
                    numero_pedido,
                    codfilial,
                    cliente,
                    status,
                    valor,
                    origem
                FROM pedidos
                WHERE codfilial = :codfilial
                ORDER BY id DESC
            """),
            {"codfilial": codfilial}
        )

        pedidos = []

        for linha in resultado:

            pedidos.append({
                "id": int(linha.numero_pedido),
                "numero_pedido": linha.numero_pedido,
                "codfilial": linha.codfilial,
                "cliente": linha.cliente,
                "status": linha.status,
                "valor": float(linha.valor),
                "origem": linha.origem
            })

        return pedidos


def criar_pedido_simulado(codfilial: str):

    with engine.begin() as connection:

        ultimo = connection.execute(
            text("""
                SELECT MAX(CAST(numero_pedido AS UNSIGNED)) as ultimo_numero
                FROM pedidos
                WHERE codfilial = :codfilial
            """),
            {"codfilial": codfilial}
        ).fetchone()

        novo_numero = 1001

        if ultimo and ultimo.ultimo_numero:
            novo_numero = int(ultimo.ultimo_numero) + 1

        connection.execute(
            text("""
                INSERT INTO pedidos
                (
                    numero_pedido,
                    codfilial,
                    cliente,
                    status,
                    valor,
                    origem
                )
                VALUES
                (
                    :numero_pedido,
                    :codfilial,
                    :cliente,
                    :status,
                    :valor,
                    :origem
                )
            """),
            {
                "numero_pedido": str(novo_numero),
                "codfilial": codfilial,
                "cliente": "Cliente Simulado",
                "status": "Novo",
                "valor": 75.90,
                "origem": "iFood"
            }
        )

        resultado = connection.execute(
            text("""
                SELECT
                    id,
                    numero_pedido,
                    codfilial,
                    cliente,
                    status,
                    valor,
                    origem
                FROM pedidos
                WHERE numero_pedido = :numero_pedido
                AND codfilial = :codfilial
            """),
            {
                "numero_pedido": str(novo_numero),
                "codfilial": codfilial
            }
        )

        pedido = resultado.fetchone()

        return {
            "id": int(pedido.numero_pedido),
            "numero_pedido": pedido.numero_pedido,
            "codfilial": pedido.codfilial,
            "cliente": pedido.cliente,
            "status": pedido.status,
            "valor": float(pedido.valor),
            "origem": pedido.origem
        }
