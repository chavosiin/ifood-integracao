import { NavLink } from "react-router-dom"

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>iFood ERP</h2>

      <ul>
        <li>
          <NavLink to="/">
            📦 Pedidos
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard">
            📊 Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/entregas">
            🛵 Entregas
          </NavLink>
        </li>

        <li>
          <NavLink to="/logs">
            🧾 Logs
          </NavLink>
        </li>

        <li>
          <NavLink to="/configuracoes">
            ⚙️ Configurações
          </NavLink>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar