function Comercial() {
  return (
    <div className="area-view">
      <h3 className="area-view__title">Comercial</h3>
      <div className="area-view__grid">
        <div className="area-view__card">
          <span className="area-view__card-label">Ventas del mes</span>
          <span className="area-view__card-value">$1,120,000</span>
        </div>
        <div className="area-view__card">
          <span className="area-view__card-label">Prospectos nuevos</span>
          <span className="area-view__card-value">31</span>
        </div>
        <div className="area-view__card">
          <span className="area-view__card-label">Tasa de conversión</span>
          <span className="area-view__card-value">19.7%</span>
        </div>
        <div className="area-view__card">
          <span className="area-view__card-label">Ticket promedio</span>
          <span className="area-view__card-value">$36,100</span>
        </div>
      </div>
      <p className="area-view__desc">
        Desempeño del área comercial y métricas de ventas.
      </p>
    </div>
  );
}

export default Comercial;
