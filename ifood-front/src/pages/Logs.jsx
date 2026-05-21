function Logs() {
  const logs = [
    {
      data: "20/05/2026 18:40",
      tipo: "Pedido",
      status: "Sucesso",
      mensagem: "Pedido integrado com sucesso"
    },
    {
      data: "20/05/2026 18:45",
      tipo: "Oracle",
      status: "Pendente",
      mensagem: "Conexão Oracle ainda não configurada"
    },
    {
      data: "20/05/2026 18:50",
      tipo: "WebSocket",
      status: "Online",
      mensagem: "Cliente conectado em tempo real"
    }
  ]

  return (
    <div>
      <div className="page-title">
        <h2>Logs da Integração</h2>
        <p>Monitoramento dos eventos da integração.</p>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h3>Eventos registrados</h3>
        </div>

        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Tipo</th>
              <th>Status</th>
              <th>Mensagem</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td>{log.data}</td>
                <td>{log.tipo}</td>
                <td>{log.status}</td>
                <td>{log.mensagem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Logs