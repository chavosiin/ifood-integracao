from fastapi import APIRouter
from sqlalchemy import text

from database import engine

router = APIRouter(
    prefix="/mysql",
    tags=["MySQL"]
)


@router.get("/teste-conexao")
def testar_mysql():

    try:

        with engine.connect() as connection:

            resultado = connection.execute(
                text("SELECT 'MYSQL ONLINE' as status")
            )

            linha = resultado.fetchone()

            return {
                "status": "sucesso",
                "mysql": linha[0]
            }

    except Exception as erro:

        return {
            "status": "erro",
            "mensagem": str(erro)
        }
