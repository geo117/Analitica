function Marketing() {
  return (
    <div className="area-view">
      <h3 className="area-view__title">Marketing</h3>
      <div className="area-view__grid">
        <div className="area-view__card">
          <span className="area-view__card-label">Alcance orgánico</span>
          <span className="area-view__card-value">28.7K</span>
        </div>
        <div className="area-view__card">
          <span className="area-view__card-label">Inversión en ads</span>
          <span className="area-view__card-value">$22,000</span>
        </div>
        <div className="area-view__card">
          <span className="area-view__card-label">ROI campañas</span>
          <span className="area-view__card-value">3.2x</span>
        </div>
        <div className="area-view__card">
          <span className="area-view__card-label">Leads generados</span>
          <span className="area-view__card-value">198</span>
        </div>
      </div>
      <p className="area-view__desc">
        Métricas de campañas digitales y alcance de marca.
      </p>
    </div>
  );
}

export default Marketing;
