import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

function Login() {
  const [usuario, setUsuario] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const navigate = useNavigate()

  async function entrar(event) {
    event.preventDefault()
    setErro("")

    try {
      const response = await api.post("/auth/login", {
        usuario,
        senha
      })

      localStorage.setItem("token", response.data.access_token)
      localStorage.setItem("usuarioLogado", response.data.usuario.nome)
      localStorage.setItem("perfilUsuario", response.data.usuario.perfil)

      navigate("/")
    } catch (error) {
      setErro("Usuário ou senha inválidos")
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={entrar}>
        <h1>iFood ERP</h1>
        <p>Acesse o painel de integração</p>

        {erro && (
          <div className="error-box">
            {erro}
          </div>
        )}

        <label>Usuário</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Digite seu usuário"
        />

        <label>Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite sua senha"
        />

        <button type="submit">
          Entrar
        </button>
      </form>
    </div>
  )
}

export default Login
