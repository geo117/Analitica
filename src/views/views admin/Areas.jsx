import { useState, useMemo } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { FaArrowLeft, FaPlus, FaEdit, FaTrashAlt, FaLayerGroup } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import '../../css/css admin/Areas.css';

const PAGE_SIZE = 8;

const MOCK_AREAS = [
  { id: 1, nombre: 'Contabilidad', fechaCreacion: '2024-01-15' },
  { id: 2, nombre: 'Producción', fechaCreacion: '2024-02-20' },
  { id: 3, nombre: 'Comercial', fechaCreacion: '2024-03-10' },
  { id: 4, nombre: 'Marketing', fechaCreacion: '2024-04-05' },
  { id: 5, nombre: 'Talento Humano', fechaCreacion: '2024-05-12' },
];

function Areas() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState({ nombre: '' });

  const totalPages = Math.ceil(MOCK_AREAS.length / PAGE_SIZE);

  const pageData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return MOCK_AREAS.slice(start, start + PAGE_SIZE);
  }, [page]);

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
    setEditData({ nombre: '' });
    setShowForm(true);
  };

  const handleEdit = (area) => {
    setSelected(area);
    setEditData({ nombre: area.nombre });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelected(null);
  };

  return (
    <div className="admin-page">
      <Navbar brandName="Administración" />
      <main className="admin-content">
        <Container>
          <div className="admin-header">
            <div className="admin-header__top">
              <h3>Áreas</h3>
              <button
                type="button"
                className="admin-header__back"
                onClick={() => navigate('/admin')}
              >
                <FaArrowLeft />
                <span>Volver</span>
              </button>
            </div>
            <p>Administra las áreas de la plataforma.</p>
          </div>

          <div className="areas-toolbar">
            <span />
            <button type="button" className="areas-btn-new" onClick={handleNew}>
              <FaPlus />
              <span>Nueva área</span>
            </button>
          </div>

          <Row className="areas-layout">
            <Col xs={12} lg={7} className="areas-col-left">
              <div className="areas-table-scroll">
                <table className="table areas-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre Área</th>
                      <th>Fecha Creación</th>
                      <th className="areas-th-actions">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageData.map((a) => (
                      <tr key={a.id}>
                        <td>{a.id}</td>
                        <td className="areas-cell-name">{a.nombre}</td>
                        <td>{a.fechaCreacion}</td>
                        <td className="areas-actions">
                          <button
                            type="button"
                            className="areas-action-btn"
                            title="Editar"
                            onClick={() => handleEdit(a)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            type="button"
                            className="areas-action-btn areas-action-btn--danger"
                            title="Eliminar"
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="areas-footer">
                <span className="areas-footer__count">
                  Total: <strong>{MOCK_AREAS.length}</strong> áreas
                </span>
                <Pagination className="areas-pagination">
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

            <Col xs={12} lg={5} className="areas-col-right">
              <div className="areas-detail">
                {showForm ? (
                  <div className="areas-form">
                    <h4 className="areas-form__title">
                      {selected ? 'Editar área' : 'Nueva área'}
                    </h4>
                    <div className="areas-form__field">
                      <label className="areas-form__label">Nombre del área</label>
                      <input
                        type="text"
                        className="areas-form__input"
                        value={editData.nombre}
                        onChange={(e) => setEditData({ ...editData, nombre: e.target.value })}
                        placeholder="Ej: Contabilidad"
                      />
                    </div>
                    <div className="areas-form__actions">
                      <button type="button" className="areas-form__btn areas-form__btn--save">
                        Guardar
                      </button>
                      <button type="button" className="areas-form__btn areas-form__btn--cancel" onClick={handleCancel}>
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="areas-detail__empty">
                    <FaLayerGroup size={40} />
                    <p>Selecciona un área o crea una nueva</p>
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

export default Areas;
