from fastapi import APIRouter
from sqlalchemy import text

from database import engine

router = APIRouter(
    prefix="/logs",
    tags=["Logs"]
)


@router.get("/")
def listar_logs():

    with engine.connect() as connection:

        resultado = connection.execute(
            text("""
                SELECT
                    id,
                    codfilial,
                    tipo,
                    status,
                    mensagem,
                    criado_em
                FROM logs_integracao
                ORDER BY id DESC
                LIMIT 100
            """)
        )

        logs = []

        for linha in resultado:

            logs.append({
                "id": linha.id,
                "codfilial": linha.codfilial,
                "tipo": linha.tipo,
                "status": linha.status,
                "mensagem": linha.mensagem,
                "criado_em": str(linha.criado_em)
            })

        return logs
