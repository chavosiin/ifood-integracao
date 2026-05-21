import { useEffect, useState } from "react"
import api from "../services/api"
import StatusBadge from "../components/StatusBadge"

function Pedidos() {

  const [pedidos, setPedidos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState("")
  const [filtro, setFiltro] = useState("")
  const [statusFiltro, setStatusFiltro] = useState("")
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null)
  const [toast, setToast] = useState("")

  async function carregarPedidos() {

    try {

      setCarregando(true)
      setErro("")

      const response = await api.get(
  "/pedidos/?codfilial=12"
)

      setPedidos(response.data)

    } catch (error) {

      console.error("Erro ao buscar pedidos:", error)

      setErro(
        "Não foi possível carregar os pedidos. Verifique se o backend está ligado."
      )

    } finally {

      setCarregando(false)

    }

  }

  useEffect(() => {

    carregarPedidos()

  }, [])

  const pedidosFiltrados = pedidos.filter((pedido) => {

    const busca = filtro.toLowerCase()

    const correspondeBusca =
      pedido.id.toString().includes(busca) ||
      pedido.cliente.toLowerCase().includes(busca)

    const correspondeStatus =
      statusFiltro === "" ||
      pedido.status === statusFiltro

    return correspondeBusca && correspondeStatus

  })

  const totalPedidos = pedidos.length

  const pedidosEmPreparo = pedidos.filter(
    pedido => pedido.status === "Em preparo"
  ).length

  const pedidosFinalizados = pedidos.filter(
    pedido => pedido.status === "Finalizado"
  ).length

  const faturamento = pedidos.reduce(
    (total, pedido) => total + pedido.valor,
    0
  )

  return (
    <div>

      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}

      <div className="page-title">

        <div>
          <h2>Pedidos iFood</h2>

          <p>
            Pedidos recebidos através da integração com o iFood.
          </p>
        </div>

        <span className="environment-badge">
          Homologação
        </span>

      </div>

      <div className="cards">

        <div className="card">
          <span>📦 Total de pedidos</span>
          <strong>{totalPedidos}</strong>
        </div>

        <div className="card">
          <span>🔥 Em preparo</span>
          <strong>{pedidosEmPreparo}</strong>
        </div>

        <div className="card">
          <span>✅ Finalizados</span>
          <strong>{pedidosFinalizados}</strong>
        </div>

        <div className="card">
          <span>💰 Faturamento</span>

          <strong>
            R$ {faturamento.toFixed(2)}
          </strong>
        </div>

      </div>

      <div className="table-card">

        <div className="table-header">

          <h3>Lista de pedidos</h3>

          <button
            onClick={async () => {

              await carregarPedidos()

              setToast("Pedidos atualizados com sucesso")

              setTimeout(() => {
                setToast("")
              }, 3000)

            }}
          >
            Atualizar
          </button>

        </div>

        <div className="filters">

          <input
            type="text"
            placeholder="Buscar por pedido ou cliente..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />

          <select
            value={statusFiltro}
            onChange={(e) => setStatusFiltro(e.target.value)}
          >
            <option value="">
              Todos os status
            </option>

            <option value="Novo">
              Novo
            </option>

            <option value="Em preparo">
              Em preparo
            </option>

            <option value="Finalizado">
              Finalizado
            </option>

            <option value="Cancelado">
              Cancelado
            </option>

          </select>

        </div>

        {carregando ? (

          <div className="loading-box">

            <div className="spinner"></div>

            <p>Carregando pedidos...</p>

          </div>

        ) : erro ? (

          <div className="error-box">
            {erro}
          </div>

        ) : (

          <table>

            <thead>
              <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Status</th>
                <th>Valor</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>

              {pedidosFiltrados.map((pedido) => (

                <tr key={pedido.id}>

                  <td>#{pedido.id}</td>

                  <td>{pedido.cliente}</td>

                  <td>
                    <StatusBadge status={pedido.status} />
                  </td>

                  <td>
                    R$ {pedido.valor.toFixed(2)}
                  </td>

                  <td>

                    <button
                      className="details-button"
                      onClick={() => setPedidoSelecionado(pedido)}
                    >
                      Ver detalhes
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

      {pedidoSelecionado && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>
              Detalhes do pedido #{pedidoSelecionado.id}
            </h2>

            <p>
              <strong>Cliente:</strong>{" "}
              {pedidoSelecionado.cliente}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {pedidoSelecionado.status}
            </p>

            <p>
              <strong>Valor:</strong>{" "}
              R$ {pedidoSelecionado.valor.toFixed(2)}
            </p>

            <p>
              <strong>Origem:</strong> iFood
            </p>

            <p>
              <strong>Pagamento:</strong> Online
            </p>

            <p>
              <strong>Observação:</strong> Sem observações.
            </p>

            <button
              onClick={() => setPedidoSelecionado(null)}
            >
              Fechar
            </button>

          </div>

        </div>

      )}

    </div>
  )
}

export default Pedidos