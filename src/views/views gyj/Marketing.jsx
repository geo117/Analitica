function Marketing() {
  return (
    <div className="area-view">
      <h3 className="area-view__title">Marketing</h3>
      <div className="area-view__grid">
        <div className="area-view__card">
          <span className="area-view__card-label">Alcance orgánico</span>
          <span className="area-view__card-value">52.4K</span>
        </div>
        <div className="area-view__card">
          <span className="area-view__card-label">Inversión en ads</span>
          <span className="area-view__card-value">$45,000</span>
        </div>
        <div className="area-view__card">
          <span className="area-view__card-label">ROI campañas</span>
          <span className="area-view__card-value">4.1x</span>
        </div>
        <div className="area-view__card">
          <span className="area-view__card-label">Leads generados</span>
          <span className="area-view__card-value">405</span>
        </div>
      </div>
      <p className="area-view__desc">
        Métricas de campañas digitales y alcance de marca.
      </p>
    </div>
  );
}

export default Marketing;
