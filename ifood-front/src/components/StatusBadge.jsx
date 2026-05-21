function StatusBadge({ status }) {
  const statusMap = {
    "Novo": "badge badge-blue",
    "Em preparo": "badge badge-yellow",
    "Finalizado": "badge badge-green",
    "Cancelado": "badge badge-red"
  }

  return (
    <span className={statusMap[status] || "badge"}>
      {status}
    </span>
  )
}

export default StatusBadge