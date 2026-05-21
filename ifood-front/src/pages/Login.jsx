import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const [usuario, setUsuario] = useState("")
  const [senha, setSenha] = useState("")
  const navigate = useNavigate()

  function entrar(event) {
    event.preventDefault()

    if (usuario === "admin" && senha === "123") {
      localStorage.setItem("usuarioLogado", "Luiz Fernando")
      localStorage.setItem("perfilUsuario", "Administrador")

      navigate("/")
    } else {
      alert("Usuário ou senha inválidos")
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={entrar}>
        <h1>iFood ERP</h1>
        <p>Acesse o painel de integração</p>

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

        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}

export default Login