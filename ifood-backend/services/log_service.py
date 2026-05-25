from sqlalchemy import text
from database import engine


def registrar_log(
    codfilial: str,
    tipo: str,
    status: str,
    mensagem: str
):

    with engine.connect() as connection:

        connection.execute(
            text("""
                INSERT INTO logs_integracao (
                    codfilial,
                    tipo,
                    status,
                    mensagem
                )
                VALUES (
                    :codfilial,
                    :tipo,
                    :status,
                    :mensagem
                )
            """),
            {
                "codfilial": codfilial,
                "tipo": tipo,
                "status": status,
                "mensagem": mensagem
            }
        )

        connection.commit()
