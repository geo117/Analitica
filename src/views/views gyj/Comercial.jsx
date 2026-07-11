function Comercial() {
  return (
    <div className="area-view">
      <h3 className="area-view__title">Comercial</h3>
      <div className="area-view__grid">
        <div className="area-view__card">
          <span className="area-view__card-label">Ventas del mes</span>
          <span className="area-view__card-value">$2,680,000</span>
        </div>
        <div className="area-view__card">
          <span className="area-view__card-label">Prospectos nuevos</span>
          <span className="area-view__card-value">58</span>
        </div>
        <div className="area-view__card">
          <span className="area-view__card-label">Tasa de conversión</span>
          <span className="area-view__card-value">25.9%</span>
        </div>
        <div className="area-view__card">
          <span className="area-view__card-label">Ticket promedio</span>
          <span className="area-view__card-value">$46,200</span>
        </div>
      </div>
      <p className="area-view__desc">
        Desempeño del área comercial y métricas de ventas.
      </p>
    </div>
  );
}

export default Comercial;
