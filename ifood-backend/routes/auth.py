from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from services.auth_service import autenticar_usuario


router = APIRouter(
    prefix="/auth",
    tags=["Autenticação"]
)


class LoginRequest(BaseModel):
    usuario: str
    senha: str


@router.post("/login")
def login(dados: LoginRequest):

    resultado = autenticar_usuario(
        dados.usuario,
        dados.senha
    )

    if not resultado:
        raise HTTPException(
            status_code=401,
            detail="Usuário ou senha inválidos"
        )

    return resultado
