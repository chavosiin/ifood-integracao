function Configuracoes() {
  return (
    <div>
      <div className="page-title">
        <h2>Configurações</h2>
        <p>Parâmetros principais da integração iFood com WinThor.</p>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h3>Configurações da integração</h3>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>URL da API iFood</label>
            <input type="text" placeholder="https://merchant-api.ifood.com.br" />
          </div>

          <div className="form-group">
            <label>Client ID</label>
            <input type="text" placeholder="Informe o Client ID" />
          </div>

          <div className="form-group">
            <label>Merchant ID</label>
            <input type="text" placeholder="Informe o Merchant ID" />
          </div>

          <div className="form-group">
            <label>Filial WinThor</label>
            <input type="text" placeholder="Ex: 1" />
          </div>
        </div>

        <div className="form-actions">
          <button>Salvar configurações</button>
        </div>
      </div>
    </div>
  )
}

export default Configuracoes