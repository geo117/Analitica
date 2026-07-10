import { useState, useMemo } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { FaArrowLeft, FaPlus, FaEdit, FaTrashAlt, FaNewspaper } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import '../../css/css admin/Noticias.css';

const PAGE_SIZE = 8;

const MOCK_NOTICIAS = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  titulo: `Noticia ${i + 1}: Novedades del sistema`,
  fecha: new Date(2025, 0, i + 1).toLocaleDateString('es-MX'),
  contenido: `Contenido completo de la noticia número ${i + 1}.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  resumen: `Resumen breve de la noticia ${i + 1}.`,
}));

function Noticias() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const totalPages = Math.ceil(MOCK_NOTICIAS.length / PAGE_SIZE);

  const pageData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return MOCK_NOTICIAS.slice(start, start + PAGE_SIZE);
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

  return (
    <div className="admin-page">
      <Navbar brandName="Administración" />
      <main className="admin-content">
        <Container >
          <div className="admin-header">
            <div className="admin-header__top">
              <h3>Noticias</h3>
              <button
                type="button"
                className="admin-header__back"
                onClick={() => navigate('/admin')}
              >
                <FaArrowLeft />
                <span>Volver</span>
              </button>
            </div>
            <p>
              Administra las noticias de la plataforma.
            </p>
          </div>

          <Row className="noticias-toolbar">
            <Col xs={12} lg={7} />
            <Col xs={12} lg={5} className="noticias-toolbar-col">
              <button type="button" className="noticias-btn-new">
                <FaPlus />
                <span>Crear noticia</span>
              </button>
            </Col>
          </Row>

          <Row className="noticias-layout">
            <Col xs={12} lg={7} className="noticias-col-left">
              <div className="noticias-table-scroll">
                <table className="table noticias-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Título Noticia</th>
                      <th>Fecha Noticia</th>
                      <th className="noticias-th-actions">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageData.map((n) => (
                      <tr
                        key={n.id}
                        className={`noticias-tr ${selected?.id === n.id ? 'noticias-tr--active' : ''}`}
                        onClick={() => setSelected(n)}
                      >
                        <td>{n.id}</td>
                        <td className="noticias-cell-title">{n.titulo}</td>
                        <td>{n.fecha}</td>
                        <td className="noticias-actions">
                          <button type="button" className="noticias-action-btn" title="Editar">
                            <FaEdit />
                          </button>
                          <button type="button" className="noticias-action-btn noticias-action-btn--danger" title="Eliminar">
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="noticias-footer">
                <span className="noticias-footer__count">
                  Total: <strong>{MOCK_NOTICIAS.length}</strong> noticias
                </span>
                <Pagination className="noticias-pagination">
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

            <Col xs={12} lg={5} className="noticias-col-right">
              <div className="noticias-detail">
                {selected ? (
                  <div className="noticias-detail__scroll">
                    <h4 className="noticias-detail__title">{selected.titulo}</h4>
                    <span className="noticias-detail__date">{selected.fecha}</span>
                    <p className="noticias-detail__body">{selected.contenido}</p>
                  </div>
                ) : (
                  <div className="noticias-detail__empty">
                    <FaNewspaper size={40} />
                    <p>Selecciona una noticia para ver su información</p>
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

export default Noticias;
