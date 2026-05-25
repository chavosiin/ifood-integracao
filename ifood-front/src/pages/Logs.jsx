import { useEffect, useState } from "react";

const API_URL = "http://10.10.9.12:8000";

function Logs() {

  const [logs, setLogs] = useState([]);

  async function carregarLogs() {

    try {

      const response = await fetch(`${API_URL}/logs/`);

      const data = await response.json();

      setLogs(data);

    } catch (error) {

      console.error(error);
    }
  }

  useEffect(() => {
    carregarLogs();
  }, []);

  return (
    <div className="page-content">

      <div className="page-header">
        <h1>Logs do Sistema</h1>
        <p>
          Monitoramento da integração iFood.
        </p>
      </div>

      <div className="card">

        <table className="table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Filial</th>
              <th>Tipo</th>
              <th>Status</th>
              <th>Mensagem</th>
              <th>Data</th>
            </tr>
          </thead>

          <tbody>

            {logs.map((log) => (

              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.codfilial}</td>
                <td>{log.tipo}</td>
                <td>{log.status}</td>
                <td>{log.mensagem}</td>
                <td>{log.criado_em}</td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Logs;
