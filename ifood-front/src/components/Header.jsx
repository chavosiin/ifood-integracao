import { useNavigate } from "react-router-dom"

function Header() {

  const navigate = useNavigate()

  const usuario =
    localStorage.getItem("usuarioLogado") || "Usuário"

  const perfil =
    localStorage.getItem("perfilUsuario") || "Administrador"

  function sair() {

    const confirmar = window.confirm(
      "Deseja realmente sair do sistema?"
    )

    if (confirmar) {

      localStorage.removeItem("usuarioLogado")
      localStorage.removeItem("perfilUsuario")

      navigate("/login")

    }

  }

  return (
    <header className="header">

      <div>
        <h1>Sistema de Integração iFood</h1>

        <span>
          Monitoramento de pedidos, entregas e integração com WinThor
        </span>
      </div>

      <div className="header-user">

        <div className="user-avatar">
          {usuario.substring(0, 2).toUpperCase()}
        </div>

        <div>
          <strong>{usuario}</strong>
          <small>{perfil}</small>
        </div>

        <button
          className="logout-button"
          onClick={sair}
        >
          Sair
        </button>

      </div>

    </header>
  )
}

export default Header