function Contabilidad() {
  return (
    <div className="area-view">
      <h3 className="area-view__title">Contabilidad</h3>
      <div className="area-view__grid">
        <div className="area-view__card">
          <span className="area-view__card-label">Ingresos del mes</span>
          <span className="area-view__card-value">$3,210,000</span>
        </div>
        <div className="area-view__card">
          <span className="area-view__card-label">Egresos del mes</span>
          <span className="area-view__card-value">$2,430,000</span>
        </div>
        <div className="area-view__card">
          <span className="area-view__card-label">Margen bruto</span>
          <span className="area-view__card-value">24.3%</span>
        </div>
        <div className="area-view__card">
          <span className="area-view__card-label">Cuentas por cobrar</span>
          <span className="area-view__card-value">$1,150,000</span>
        </div>
      </div>
      <p className="area-view__desc">
        Resumen de los principales indicadores contables del periodo actual.
      </p>
    </div>
  );
}

export default Contabilidad;
