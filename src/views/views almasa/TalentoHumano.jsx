function TalentoHumano() {
  return (
    <div className="area-view">
      <h3 className="area-view__title">Talento Humano</h3>
      <div className="area-view__grid">
        <div className="area-view__card">
          <span className="area-view__card-label">Plantilla activa</span>
          <span className="area-view__card-value">84</span>
        </div>
        <div className="area-view__card">
          <span className="area-view__card-label">Rotación mensual</span>
          <span className="area-view__card-value">2.3%</span>
        </div>
        <div className="area-view__card">
          <span className="area-view__card-label">Horas capacitación</span>
          <span className="area-view__card-value">320</span>
        </div>
        <div className="area-view__card">
          <span className="area-view__card-label">Satisfacción</span>
          <span className="area-view__card-value">4.2/5</span>
        </div>
      </div>
      <p className="area-view__desc">
        Indicadores de gestión del capital humano.
      </p>
    </div>
  );
}

export default TalentoHumano;
