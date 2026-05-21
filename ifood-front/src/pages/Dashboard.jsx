function Dashboard() {
  return (
    <div>
      <div className="page-title">
        <h2>Dashboard</h2>
        <p>Resumo geral da integração entre iFood, FastAPI e WinThor.</p>
      </div>

      <div className="cards">
        <div className="card">
          <span>Pedidos integrados</span>
          <strong>128</strong>
        </div>

        <div className="card">
          <span>Erros de integração</span>
          <strong>2</strong>
        </div>

        <div className="card">
          <span>Produtos sincronizados</span>
          <strong>842</strong>
        </div>

        <div className="card">
          <span>Última sincronização</span>
          <strong>Hoje</strong>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h3>Status dos módulos</h3>
        </div>

        <table>
          <thead>
            <tr>
              <th>Módulo</th>
              <th>Status</th>
              <th>Descrição</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Frontend React</td>
              <td>Ativo</td>
              <td>Interface web em funcionamento.</td>
            </tr>

            <tr>
              <td>Backend FastAPI</td>
              <td>Ativo</td>
              <td>API respondendo na porta 8000.</td>
            </tr>

            <tr>
              <td>Oracle WinThor</td>
              <td>Pendente</td>
              <td>Aguardando configuração de conexão.</td>
            </tr>

            <tr>
              <td>iFood API</td>
              <td>Pendente</td>
              <td>Aguardando credenciais da integração.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard