import { useState, useMemo } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { FaArrowLeft, FaPlus, FaEdit, FaTrashAlt, FaShieldAlt, FaSave, FaTimes, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import '../../css/css admin/Permisos.css';

const PAGE_SIZE = 8;

const ALL_PERMISOS = [
  { id: 1, nombre: 'Gestión de Usuarios' },
  { id: 2, nombre: 'Gestión de Perfiles' },
  { id: 3, nombre: 'Gestión de Áreas' },
  { id: 4, nombre: 'Gestión de Noticias' },
  { id: 5, nombre: 'Gestión de Reportes' },
  { id: 6, nombre: 'Visualizar Dashboard' },
  { id: 7, nombre: 'Exportar Datos' },
  { id: 8, nombre: 'Configuración del Sistema' },
  { id: 9, nombre: 'Auditoría' },
  { id: 10, nombre: 'Administración General' },
];

const INITIAL_PERFILES = [
  { id: 1, nombre: 'Administrador', fechaCreacion: '2024-01-15', permisos: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { id: 2, nombre: 'Editor', fechaCreacion: '2024-02-20', permisos: [3, 4, 5, 6, 7] },
  { id: 3, nombre: 'Lector', fechaCreacion: '2024-03-10', permisos: [4, 6] },
  { id: 4, nombre: 'Supervisor', fechaCreacion: '2024-04-05', permisos: [4, 5, 6, 7, 9] },
  { id: 5, nombre: 'Reportes', fechaCreacion: '2024-05-12', permisos: [5, 6, 7] },
  { id: 6, nombre: 'Marketing', fechaCreacion: '2024-06-18', permisos: [3, 4, 6, 7] },
  { id: 7, nombre: 'Comercial', fechaCreacion: '2024-07-22', permisos: [3, 5, 6, 7] },
  { id: 8, nombre: 'Talento Humano', fechaCreacion: '2024-08-01', permisos: [1, 2, 4, 6] },
  { id: 9, nombre: 'Finanzas', fechaCreacion: '2024-09-14', permisos: [5, 6, 7, 9] },
  { id: 10, nombre: 'Producción', fechaCreacion: '2024-10-30', permisos: [3, 4, 6] },
];

function Permisos() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [perfiles, setPerfiles] = useState(INITIAL_PERFILES);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draftPermisos, setDraftPermisos] = useState([]);
  const [formProfileId, setFormProfileId] = useState('');
  const [formPermisos, setFormPermisos] = useState([]);

  const totalPages = Math.ceil(perfiles.length / PAGE_SIZE);

  const pageData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const sorted = [...perfiles].sort((a, b) => a.id - b.id);
    return sorted.slice(start, start + PAGE_SIZE);
  }, [page, perfiles]);

  const pages = useMemo(() => {
    const items = [];
    const siblings = 1;
    const startPage = Math.max(1, page - siblings);
    const endPage = Math.min(totalPages, page + siblings);

    items.push(
      <Pagination.Item key={1} active={1 === page} onClick={() => setPage(1)}>1</Pagination.Item>,
    );
    if (startPage > 2) items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
    for (let i = Math.max(2, startPage); i <= Math.min(totalPages - 1, endPage); i++) {
      items.push(
        <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>{i}</Pagination.Item>,
      );
    }
    if (endPage < totalPages - 1) items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
    if (totalPages > 1) {
      items.push(
        <Pagination.Item key={totalPages} active={totalPages === page} onClick={() => setPage(totalPages)}>{totalPages}</Pagination.Item>,
      );
    }
    return items;
  }, [page, totalPages]);

  const handleNew = () => {
    setSelected(null);
    setEditing(false);
    setShowForm(true);
    setFormProfileId('');
    setFormPermisos([]);
  };

  const handleSelect = (perfil) => {
    setSelected(perfil);
    setShowForm(false);
    setEditing(false);
  };

  const handleEdit = (e, perfil) => {
    e.stopPropagation();
    setSelected(perfil);
    setShowForm(false);
    setEditing(true);
    setDraftPermisos([...perfil.permisos]);
  };

  const handleCancelEdit = () => {
    if (showForm) {
      setShowForm(false);
      setSelected(null);
      return;
    }
    setEditing(false);
    setDraftPermisos([]);
  };

  const handleSaveEdit = () => {
    const updated = perfiles.map((p) =>
      p.id === selected.id ? { ...p, permisos: draftPermisos } : p,
    );
    setPerfiles(updated);
    setSelected({ ...selected, permisos: draftPermisos });
    setEditing(false);
    setDraftPermisos([]);
  };

  const handleSaveNew = () => {
    if (!formProfileId) return;
    const id = parseInt(formProfileId, 10);
    const updated = perfiles.map((p) =>
      p.id === id ? { ...p, permisos: formPermisos } : p,
    );
    setPerfiles(updated);
    const updatedProfile = updated.find((p) => p.id === id);
    setSelected(updatedProfile);
    setShowForm(false);
  };

  const toggleDraft = (permisoId) => {
    const nuevos = [...draftPermisos];
    const idx = nuevos.indexOf(permisoId);
    if (idx === -1) nuevos.push(permisoId);
    else nuevos.splice(idx, 1);
    setDraftPermisos(nuevos);
  };

  const toggleFormPermiso = (permisoId) => {
    const nuevos = [...formPermisos];
    const idx = nuevos.indexOf(permisoId);
    if (idx === -1) nuevos.push(permisoId);
    else nuevos.splice(idx, 1);
    setFormPermisos(nuevos);
  };

  return (
    <div className="admin-page">
      <Navbar brandName="Administración" />
      <main className="admin-content">
        <Container>
          <div className="admin-header">
            <div className="admin-header__box">
              <div className="admin-header__top">
                <h3>Permisos</h3>
                <button
                  type="button"
                  className="admin-header__back"
                  onClick={() => navigate('/admin')}
                >
                  <FaArrowLeft />
                  <span>Volver</span>
                </button>
              </div>
              <p>Asigna permisos a los perfiles.</p>
            </div>
          </div>

          <div className="admin-section__box">
            <div className="permisos-toolbar">
              <span />
              <button type="button" className="permisos-btn-new" onClick={handleNew}>
                <FaPlus />
                <span>Agregar nuevo permiso</span>
              </button>
            </div>

            <Row className="permisos-layout">
              <Col xs={12} lg={7} className="permisos-col-left">
                <div className="permisos-table-scroll">
                  <table className="table permisos-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Perfil</th>
                        <th>Fecha Creación</th>
                        <th className="permisos-th-actions">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageData.map((p) => (
                        <tr
                          key={p.id}
                          className={`permisos-tr ${selected?.id === p.id && !showForm ? 'permisos-tr--active' : ''}`}
                          onClick={() => handleSelect(p)}
                        >
                          <td>{p.id}</td>
                          <td className="permisos-cell-name">{p.nombre}</td>
                          <td>{p.fechaCreacion}</td>
                          <td className="permisos-actions">
                            <button
                              type="button"
                              className="permisos-action-btn"
                              title="Editar"
                              onClick={(e) => handleEdit(e, p)}
                            >
                              <FaEdit />
                            </button>
                            <button type="button" className="permisos-action-btn permisos-action-btn--danger" title="Eliminar">
                              <FaTrashAlt />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="permisos-footer">
                  <span className="permisos-footer__count">
                    Total: <strong>{perfiles.length}</strong> perfiles
                  </span>
                  <Pagination className="permisos-pagination">
                    <Pagination.Prev
                      disabled={page === 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                    />
                    {pages}
                    <Pagination.Next
                      disabled={page === totalPages}
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    />
                  </Pagination>
                </div>
              </Col>

              <Col xs={12} lg={5} className="permisos-col-right">
                <div className="permisos-detail">
                  {showForm ? (
                    <div className="permisos-form">
                      <div className="permisos-form__header">
                        <h4 className="permisos-form__title">Nuevo permiso</h4>
                        <div className="permisos-form__header-actions">
                          <button type="button" className="permisos-icon-btn permisos-icon-btn--save" title="Guardar" onClick={handleSaveNew}>
                            <FaSave />
                          </button>
                          <button type="button" className="permisos-icon-btn permisos-icon-btn--cancel" title="Cancelar" onClick={handleCancelEdit}>
                            <FaTimes />
                          </button>
                        </div>
                      </div>
                      <div className="permisos-form__field">
                        <label className="permisos-form__label">Seleccionar perfil</label>
                        <select
                          className="permisos-form__select"
                          value={formProfileId}
                          onChange={(e) => setFormProfileId(e.target.value)}
                        >
                          <option value="">-- Seleccione un perfil --</option>
                          {perfiles.map((p) => (
                            <option key={p.id} value={p.id}>{p.nombre}</option>
                          ))}
                        </select>
                      </div>
                      <div className="permisos-permissions">
                        <h5 className="permisos-permissions__heading">Permisos</h5>
                        <Row className="permisos-permissions__grid">
                          <Col xs={6} className="permisos-permissions__col-left">
                            <div className="permisos-permissions__header">
                              <span className="permisos-permissions__header-con">Permisos disponibles</span>
                            </div>
                            <div className="permisos-permissions__list">
                              {ALL_PERMISOS.map((perm) => (
                                <div key={perm.id} className="permisos-permissions__item">
                                  {perm.nombre}
                                </div>
                              ))}
                            </div>
                          </Col>
                          <Col xs={6} className="permisos-permissions__col-right">
                            <div className="permisos-permissions__header">
                              <span className="permisos-permissions__header-con">Con permiso</span>
                              <span className="permisos-permissions__header-sin">Sin permiso</span>
                            </div>
                            <div className="permisos-permissions__checks">
                              {ALL_PERMISOS.map((perm) => {
                                const tiene = formPermisos.includes(perm.id);
                                return (
                                  <div key={perm.id} className="permisos-permissions__checks-row">
                                    <label className="permisos-permissions__checkbox-label">
                                      <input
                                        type="checkbox"
                                        className="permisos-permissions__checkbox"
                                        checked={tiene}
                                        onChange={() => toggleFormPermiso(perm.id)}
                                      />
                                    </label>
                                    <label className="permisos-permissions__checkbox-label">
                                      <input
                                        type="checkbox"
                                        className="permisos-permissions__checkbox"
                                        checked={!tiene}
                                        onChange={() => {
                                          const nuevos = formPermisos.filter((id) => id !== perm.id);
                                          setFormPermisos(nuevos);
                                        }}
                                      />
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  ) : selected ? (
                    <div className="permisos-profile">
                      <div className="permisos-profile__header">
                        <h4 className="permisos-profile__title">{selected.nombre}</h4>
                        {editing && (
                          <div className="permisos-profile__header-actions">
                            <button type="button" className="permisos-icon-btn permisos-icon-btn--save" title="Guardar" onClick={handleSaveEdit}>
                              <FaSave />
                            </button>
                            <button type="button" className="permisos-icon-btn permisos-icon-btn--cancel" title="Cancelar" onClick={handleCancelEdit}>
                              <FaTimes />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="permisos-profile__field">
                        <span className="permisos-profile__label">Perfil</span>
                        <span className="permisos-profile__value">{selected.nombre}</span>
                      </div>
                      <div className="permisos-profile__field">
                        <span className="permisos-profile__label">Fecha de creación</span>
                        <span className="permisos-profile__value">{selected.fechaCreacion}</span>
                      </div>

                      <div className="permisos-permissions">
                        <h5 className="permisos-permissions__heading">Permisos asignados</h5>
                        <Row className="permisos-permissions__grid">
                          <Col xs={6} className="permisos-permissions__col-left">
                            <div className="permisos-permissions__header">
                              <span className="permisos-permissions__header-con">Permisos disponibles</span>
                            </div>
                            <div className="permisos-permissions__list">
                              {ALL_PERMISOS.map((perm) => (
                                <div key={perm.id} className="permisos-permissions__item">
                                  {perm.nombre}
                                </div>
                              ))}
                            </div>
                          </Col>
                          <Col xs={6} className="permisos-permissions__col-right">
                            <div className="permisos-permissions__header">
                              <span className="permisos-permissions__header-con">Con permiso</span>
                              <span className="permisos-permissions__header-sin">Sin permiso</span>
                            </div>
                            <div className="permisos-permissions__checks">
                              {ALL_PERMISOS.map((perm) => {
                                const lista = editing ? draftPermisos : selected.permisos;
                                const tiene = lista.includes(perm.id);
                                return (
                                  <div key={perm.id} className="permisos-permissions__checks-row">
                                    {editing ? (
                                      <>
                                        <label className="permisos-permissions__checkbox-label">
                                          <input
                                            type="checkbox"
                                            className="permisos-permissions__checkbox"
                                            checked={tiene}
                                            onChange={() => toggleDraft(perm.id)}
                                          />
                                        </label>
                                        <label className="permisos-permissions__checkbox-label">
                                          <input
                                            type="checkbox"
                                            className="permisos-permissions__checkbox"
                                            checked={!tiene}
                                            onChange={() => {
                                              const nuevos = draftPermisos.filter((id) => id !== perm.id);
                                              setDraftPermisos(nuevos);
                                            }}
                                          />
                                        </label>
                                      </>
                                    ) : (
                                      <>
                                        <div className="permisos-permissions__indicator-cell">
                                          {tiene && (
                                            <span className="permisos-permissions__indicator permisos-permissions__indicator--on">
                                              <FaCheck />
                                            </span>
                                          )}
                                        </div>
                                        <div className="permisos-permissions__indicator-cell">
                                          {!tiene && (
                                            <span className="permisos-permissions__indicator permisos-permissions__indicator--on">
                                              <FaCheck />
                                            </span>
                                          )}
                                        </div>
                                      </>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  ) : (
                    <div className="permisos-detail__empty">
                      <FaShieldAlt size={40} />
                      <p>Selecciona un perfil para ver sus permisos</p>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </main>
    </div>
  );
}

export default Permisos;
