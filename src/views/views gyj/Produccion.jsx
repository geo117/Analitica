function Produccion() {
  return (
    <div className="area-view">
      <h3 className="area-view__title">Producción</h3>
      <div className="area-view__grid">
        <div className="area-view__card">
          <span className="area-view__card-label">Unidades producidas</span>
          <span className="area-view__card-value">15,800</span>
        </div>
        <div className="area-view__card">
          <span className="area-view__card-label">Eficiencia</span>
          <span className="area-view__card-value">89.5%</span>
        </div>
        <div className="area-view__card">
          <span className="area-view__card-label">Tiempo muerto</span>
          <span className="area-view__card-value">3.6%</span>
        </div>
        <div className="area-view__card">
          <span className="area-view__card-label">Órdenes completadas</span>
          <span className="area-view__card-value">124</span>
        </div>
      </div>
      <p className="area-view__desc">
        Indicadores de eficiencia y productividad de la planta.
      </p>
    </div>
  );
}

export default Produccion;
