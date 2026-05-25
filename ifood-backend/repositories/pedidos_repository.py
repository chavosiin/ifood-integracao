from sqlalchemy import text
from database import engine


def listar_pedidos_por_filial(codfilial: str):
    with engine.connect() as connection:
        resultado = connection.execute(
            text("""
                SELECT
                    id,
                    numero_pedido,
                    codfilial,
                    cliente,
                    status,
                    valor
                FROM pedidos
                WHERE codfilial = :codfilial
                ORDER BY criado_em DESC
            """),
            {"codfilial": codfilial}
        )

        pedidos = []

        for linha in resultado:
            pedidos.append({
                "id": linha.numero_pedido,
                "codfilial": linha.codfilial,
                "cliente": linha.cliente,
                "status": linha.status,
                "valor": float(linha.valor)
            })

        return pedidos
