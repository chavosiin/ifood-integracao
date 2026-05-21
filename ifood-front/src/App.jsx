import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import Layout from "./components/Layout"

import Login from "./pages/Login"
import Pedidos from "./pages/Pedidos"
import Dashboard from "./pages/Dashboard"
import Entregas from "./pages/Entregas"
import Logs from "./pages/Logs"
import Configuracoes from "./pages/Configuracoes"

function RotasPrivadas({ children }) {
  const usuarioLogado = localStorage.getItem("usuarioLogado")

  return usuarioLogado
    ? children
    : <Navigate to="/login" />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/*"
          element={
            <RotasPrivadas>
              <Layout>
                <Routes>
                  <Route path="/" element={<Pedidos />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/entregas" element={<Entregas />} />
                  <Route path="/logs" element={<Logs />} />
                  <Route path="/configuracoes" element={<Configuracoes />} />
                </Routes>
              </Layout>
            </RotasPrivadas>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App