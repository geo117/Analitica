import { useState, useMemo } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { FaArrowLeft, FaEdit, FaTrashAlt, FaUser, FaPlus, FaCheck, FaSave, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import '../../css/css admin/Perfiles.css';

const PAGE_SIZE = 8;

const ALL_AREAS = ['Contabilidad', 'Producción', 'Comercial', 'Marketing', 'Talento Humano'];

const ALL_USERS = [
  'Admin General', 'Carlos López', 'María García', 'José Martínez',
  'Laura Sánchez', 'Pedro Ramírez', 'Ana Torres', 'Diego Fernández',
  'Sofía Ruiz', 'Roberto Díaz', 'Elena Gómez', 'Fernando Castro',
  'Lucía Morales', 'Gabriela Ortiz', 'Héctor Vargas', 'Patricia Mendoza',
  'Mario Jiménez', 'Daniela Ríos', 'Andrea Campos', 'Ricardo Peña',
  'Valentina Flores', 'Sebastián Vega', 'Fernanda Soto', 'Emilio Rivas',
  'Camila Navarro', 'Guillermo Herrera', 'Ximena Reyes', 'Iván Castillo',
  'Paola Medina', 'Jorge Aguilar', 'Karla Paredes', 'Leonardo Cruz',
  'Natalia Bustos', 'Omar Sandoval',
];

const MOCK_PERFILES = [
  { id: 1, nombre: 'Administrador', fechaCreacion: '2024-01-15', usuarios: ['Admin General', 'Carlos López', 'María García', 'José Martínez'], areas: ['Contabilidad', 'Producción', 'Comercial', 'Marketing', 'Talento Humano'] },
  { id: 2, nombre: 'Editor', fechaCreacion: '2024-02-20', usuarios: ['Laura Sánchez', 'Pedro Ramírez', 'Ana Torres', 'Diego Fernández', 'Sofía Ruiz'], areas: ['Contabilidad', 'Comercial', 'Marketing'] },
  { id: 3, nombre: 'Lector', fechaCreacion: '2024-03-10', usuarios: ['Roberto Díaz', 'Elena Gómez', 'Fernando Castro', 'Lucía Morales'], areas: ['Producción', 'Talento Humano'] },
  { id: 4, nombre: 'Supervisor', fechaCreacion: '2024-04-05', usuarios: ['Gabriela Ortiz', 'Héctor Vargas', 'Patricia Mendoza'], areas: ['Contabilidad', 'Producción', 'Comercial'] },
  { id: 5, nombre: 'Reportes', fechaCreacion: '2024-05-12', usuarios: ['Mario Jiménez', 'Daniela Ríos'], areas: ['Contabilidad'] },
  { id: 6, nombre: 'Marketing', fechaCreacion: '2024-06-18', usuarios: ['Andrea Campos', 'Ricardo Peña', 'Valentina Flores', 'Sebastián Vega'], areas: ['Marketing', 'Comercial'] },
  { id: 7, nombre: 'Comercial', fechaCreacion: '2024-07-22', usuarios: ['Fernanda Soto', 'Emilio Rivas', 'Camila Navarro'], areas: ['Comercial'] },
  { id: 8, nombre: 'Talento Humano', fechaCreacion: '2024-08-01', usuarios: ['Guillermo Herrera', 'Ximena Reyes'], areas: ['Talento Humano'] },
  { id: 9, nombre: 'Finanzas', fechaCreacion: '2024-09-14', usuarios: ['Iván Castillo', 'Paola Medina', 'Jorge Aguilar', 'Karla Paredes'], areas: ['Contabilidad', 'Producción', 'Comercial', 'Marketing', 'Talento Humano'] },
  { id: 10, nombre: 'Producción', fechaCreacion: '2024-10-30', usuarios: ['Leonardo Cruz', 'Natalia Bustos', 'Omar Sandoval'], areas: ['Producción', 'Contabilidad'] },
];

function Perfiles() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', areas: [], usuarios: [] });
  const [userSearch, setUserSearch] = useState('');

  const totalPages = Math.ceil(MOCK_PERFILES.length / PAGE_SIZE);

  const pageData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return MOCK_PERFILES.slice(start, start + PAGE_SIZE);
  }, [page]);

  const pages = useMemo(() => {
    const items = [];
    const siblings = 1;
    const startPage = Math.max(1, page - siblings);
    const endPage = Math.min(totalPages, page + siblings);

    items.push(
      <Pagination.Item key={1} active={1 === page} onClick={() => setPage(1)}>1</Pagination.Item>,
    );

    if (startPage > 2) {
      items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
    }

    for (let i = Math.max(2, startPage); i <= Math.min(totalPages - 1, endPage); i++) {
      items.push(
        <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>{i}</Pagination.Item>,
      );
    }

    if (endPage < totalPages - 1) {
      items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
    }

    if (totalPages > 1) {
      items.push(
        <Pagination.Item key={totalPages} active={totalPages === page} onClick={() => setPage(totalPages)}>{totalPages}</Pagination.Item>,
      );
    }

    return items;
  }, [page, totalPages]);

  const handleSelect = (perfil) => {
    setSelected(perfil);
    setShowForm(false);
  };

  const handleNew = () => {
    setSelected(null);
    setFormData({ nombre: '', areas: [], usuarios: [] });
    setUserSearch('');
    setShowForm(true);
  };

  const handleEdit = (perfil, e) => {
    e.stopPropagation();
    setSelected(perfil);
    setFormData({
      nombre: perfil.nombre,
      areas: [...perfil.areas],
      usuarios: [...perfil.usuarios],
    });
    setUserSearch('');
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const toggleArea = (area) => {
    setFormData((prev) => ({
      ...prev,
      areas: prev.areas.includes(area)
        ? prev.areas.filter((a) => a !== area)
        : [...prev.areas, area],
    }));
  };

  const toggleUser = (user) => {
    setFormData((prev) => ({
      ...prev,
      usuarios: prev.usuarios.includes(user)
        ? prev.usuarios.filter((u) => u !== user)
        : [...prev.usuarios, user],
    }));
  };

  const filteredUsers = useMemo(() => {
    if (!userSearch) return ALL_USERS;
    return ALL_USERS.filter((u) =>
      u.toLowerCase().includes(userSearch.toLowerCase())
    );
  }, [userSearch]);

  return (
    <div className="admin-page">
      <Navbar brandName="Administración" />
      <main className="admin-content">
        <Container>
          <div className="admin-header">
            <div className="admin-header__top">
              <h3>Perfiles</h3>
              <button
                type="button"
                className="admin-header__back"
                onClick={() => navigate('/admin')}
              >
                <FaArrowLeft />
                <span>Volver</span>
              </button>
            </div>
            <p>Configura los perfiles de acceso.</p>
          </div>

          <Row className="perfiles-toolbar">
            <Col xs={12} lg={7} />
            <Col xs={12} lg={5} className="perfiles-toolbar-col">
              <button type="button" className="perfiles-btn-new" onClick={handleNew}>
                <FaPlus />
                <span>Crear nuevo perfil</span>
              </button>
            </Col>
          </Row>

          <Row className="perfiles-layout">
            <Col xs={12} lg={7} className="perfiles-col-left">
              <div className="perfiles-table-scroll">
                <table className="table perfiles-table">
                  <thead>
                    <tr className='text-center'>
                      <th>Nombre</th>
                      <th>Areas</th>
                      <th>Fecha Creación</th>
                      <th>Usuarios</th>
                      <th className="perfiles-th-actions">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageData.map((p) => (
                      <tr
                        key={p.id}
                        className={`perfiles-tr ${selected?.id === p.id ? 'perfiles-tr--active' : ''}`}
                        onClick={() => handleSelect(p)}
                      >
                        <td className="perfiles-cell-name">{p.nombre}</td>
                        <td className='text-center'>
                          <span className="perfiles-badge-count">{p.areas.length}</span>
                        </td>
                        <td className='text-center'>{p.fechaCreacion}</td>
                        <td className='text-center'>
                          <span className="perfiles-badge-count">{p.usuarios.length}</span>
                        </td>
                        <td className="perfiles-actions">
                          <button type="button" className="perfiles-action-btn" title="Editar" onClick={(e) => handleEdit(p, e)}>
                            <FaEdit />
                          </button>
                          <button type="button" className="perfiles-action-btn perfiles-action-btn--danger" title="Eliminar">
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="perfiles-footer">
                <span className="perfiles-footer__count">
                  Total: <strong>{MOCK_PERFILES.length}</strong> perfiles
                </span>
                <Pagination className="perfiles-pagination">
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

            <Col xs={12} lg={5} className="perfiles-col-right">
              <div className="perfiles-detail">
                {showForm ? (
                  <div className="perfiles-form">
                    <div className="perfiles-form__title-row">
                      <h4 className="perfiles-form__title">
                        {selected ? `Editar: ${selected.nombre}` : 'Nuevo perfil'}
                      </h4>
                      <div className="perfiles-form__title-actions">
                        <button type="button" className="perfiles-form__icon-btn" title="Guardar">
                          <FaSave />
                        </button>
                        <button type="button" className="perfiles-form__icon-btn perfiles-form__icon-btn--cancel" title="Cancelar" onClick={handleCancel}>
                          <FaTimes />
                        </button>
                      </div>
                    </div>

                    <div className="perfiles-form__field">
                      <label className="perfiles-form__label">Nombre del perfil</label>
                      <input
                        type="text"
                        className="perfiles-form__input"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder="Ej: Administrador"
                      />
                    </div>

                    <div className="perfiles-form__field">
                      <label className="perfiles-form__label">Áreas asignadas</label>
                      <div className="perfiles-form__multiselect">
                        {ALL_AREAS.map((area) => (
                          <button
                            key={area}
                            type="button"
                            className={`perfiles-form__chip ${formData.areas.includes(area) ? 'perfiles-form__chip--active' : ''}`}
                            onClick={() => toggleArea(area)}
                          >
                            {formData.areas.includes(area) && <FaCheck className="perfiles-form__chip-icon" />}
                            {area}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="perfiles-form__field">
                      <label className="perfiles-form__label">Usuarios asignados ({formData.usuarios.length})</label>
                      <input
                        type="text"
                        className="perfiles-form__input perfiles-form__input--search"
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        placeholder="Buscar usuarios..."
                      />
                      <div className="perfiles-form__multiselect perfiles-form__multiselect--users">
                        {filteredUsers.map((user) => (
                          <button
                            key={user}
                            type="button"
                            className={`perfiles-form__chip ${formData.usuarios.includes(user) ? 'perfiles-form__chip--active' : ''}`}
                            onClick={() => toggleUser(user)}
                          >
                            <FaUser className="perfiles-form__chip-user-icon" />
                            <span>{user}</span>
                            {formData.usuarios.includes(user) && <FaCheck className="perfiles-form__chip-check" />}
                          </button>
                        ))}
                        {filteredUsers.length === 0 && (
                          <span className="perfiles-form__no-results">No se encontraron usuarios</span>
                        )}
                      </div>
                    </div>


                  </div>
                ) : selected ? (
                  <>
                    <h4 className="perfiles-detail__title">{selected.nombre}</h4>

                    <div className="perfiles-detail__field">
                      <span className="perfiles-detail__label">Nombre del perfil</span>
                      <span className="perfiles-detail__value">{selected.nombre}</span>
                    </div>

                    <div className="perfiles-detail__field">
                      <span className="perfiles-detail__label">Fecha de creación</span>
                      <span className="perfiles-detail__value">{selected.fechaCreacion}</span>
                    </div>

                    <div className="perfiles-detail__field">
                      <span className="perfiles-detail__label">Áreas asignadas ({selected.areas.length})</span>
                    </div>

                    <div className="perfiles-detail__areas-grid">
                      {ALL_AREAS.map((area) => (
                        <div
                          key={area}
                          className={`perfiles-detail__area ${selected.areas.includes(area) ? 'perfiles-detail__area--active' : ''}`}
                        >
                          {area}
                        </div>
                      ))}
                    </div>

                    <div className="perfiles-detail__field">
                      <span className="perfiles-detail__label">Usuarios asignados ({selected.usuarios.length})</span>
                    </div>

                    <div className="perfiles-detail__users-grid">
                      {selected.usuarios.map((u) => (
                        <div key={u} className="perfiles-detail__user">
                          <FaUser className="perfiles-detail__user-icon" />
                          <span>{u}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="perfiles-detail__empty">
                    <FaUser size={40} />
                    <p>Selecciona un perfil para ver su información</p>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default Perfiles;
