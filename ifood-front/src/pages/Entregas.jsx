function Entregas() {
  return (
    <div>
      <div className="page-title">
        <h2>Entregas</h2>
        <p>Acompanhamento das entregas vinculadas aos pedidos iFood.</p>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h3>Monitoramento de entregas</h3>
        </div>

        <table>
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Entregador</th>
              <th>Status</th>
              <th>Previsão</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>#1001</td>
              <td>iFood Entrega</td>
              <td>Em rota</td>
              <td>25 min</td>
            </tr>

            <tr>
              <td>#1002</td>
              <td>Loja</td>
              <td>Aguardando retirada</td>
              <td>15 min</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Entregas