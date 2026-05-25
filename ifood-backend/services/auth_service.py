from datetime import datetime, timedelta
import asyncio

from jose import jwt
from passlib.context import CryptContext
from sqlalchemy import text

from database import engine
from services.log_service import registrar_log
from routes.websocket import notificar_novo_pedido


SECRET_KEY = "CHAVE_SUPER_SECRETA_TROCAR_DEPOIS"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 480

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def gerar_hash_senha(senha: str):
    return pwd_context.hash(senha)


def verificar_senha(senha: str, senha_hash: str):
    return pwd_context.verify(senha, senha_hash)


def criar_token(dados: dict):
    dados_token = dados.copy()

    expiracao = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    dados_token.update({
        "exp": expiracao
    })

    token = jwt.encode(
        dados_token,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token


def autenticar_usuario(usuario: str, senha: str):
    with engine.connect() as connection:
        resultado = connection.execute(
            text("""
                SELECT
                    id,
                    nome,
                    usuario,
                    senha_hash,
                    perfil,
                    ativo
                FROM usuarios
                WHERE usuario = :usuario
            """),
            {"usuario": usuario}
        )

        user = resultado.fetchone()

        if not user:
            registrar_log(
                "12",
                "LOGIN",
                "ERRO",
                f"Tentativa login inválido: {usuario}"
            )

            return None

        if not user.ativo:
            registrar_log(
                "12",
                "LOGIN",
                "ERRO",
                f"Usuário inativo: {usuario}"
            )

            return None

        if not verificar_senha(
            senha,
            user.senha_hash
        ):
            registrar_log(
                "12",
                "LOGIN",
                "ERRO",
                f"Senha inválida para usuário: {usuario}"
            )

            return None

        registrar_log(
            "12",
            "LOGIN",
            "SUCESSO",
            f"Usuário {usuario} autenticado"
        )

        try:
            asyncio.create_task(
                notificar_novo_pedido(
                    f"Usuário {usuario} logou no sistema"
                )
            )
        except RuntimeError:
            pass

        token = criar_token({
            "sub": user.usuario,
            "nome": user.nome,
            "perfil": user.perfil
        })

        return {
            "access_token": token,
            "token_type": "bearer",
            "usuario": {
                "id": user.id,
                "nome": user.nome,
                "usuario": user.usuario,
                "perfil": user.perfil
            }
        }
