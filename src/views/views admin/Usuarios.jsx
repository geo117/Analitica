import { useState, useMemo } from 'react';
import { Container, Pagination, Modal } from 'react-bootstrap';
import { FaArrowLeft, FaPlus, FaEdit, FaTrashAlt, FaSave, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import '../../css/css admin/Usuarios.css';

const PAGE_SIZE = 10;

const MOCK_USUARIOS = Array.from({ length: 87 }, (_, i) => ({
  id: i + 1,
  nombre: `Usuario ${i + 1}`,
  username: `user${i + 1}`,
  email: `user${i + 1}@correo.com`,
  rol: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Editor' : 'Lector',
}));

function Usuarios() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({ nombre: '', username: '', email: '', rol: 'Lector' });

  const totalPages = Math.ceil(MOCK_USUARIOS.length / PAGE_SIZE);

  const pageData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return MOCK_USUARIOS.slice(start, start + PAGE_SIZE);
  }, [page]);

  const pages = useMemo(() => {
    const items = [];
    const siblings = 1;
    const startPage = Math.max(1, page - siblings);
    const endPage = Math.min(totalPages, page + siblings);

    items.push(
      <Pagination.Item key={1} active={1 === page} onClick={() => setPage(1)}>
        1
      </Pagination.Item>,
    );

    if (startPage > 2) {
      items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
    }

    for (let i = Math.max(2, startPage); i <= Math.min(totalPages - 1, endPage); i++) {
      items.push(
        <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>
          {i}
        </Pagination.Item>,
      );
    }

    if (endPage < totalPages - 1) {
      items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
    }

    if (totalPages > 1) {
      items.push(
        <Pagination.Item key={totalPages} active={totalPages === page} onClick={() => setPage(totalPages)}>
          {totalPages}
        </Pagination.Item>,
      );
    }

    return items;
  }, [page, totalPages]);

  const handleNew = () => {
    setEditUser(null);
    setFormData({ nombre: '', username: '', email: '', rol: 'Lector' });
    setShowModal(true);
  };

  const handleEdit = (user, e) => {
    e.stopPropagation();
    setEditUser(user);
    setFormData({ nombre: user.nombre, username: user.username, email: user.email, rol: user.rol });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="admin-page">
      <Navbar brandName="Administración" />
      <main className="admin-content">
        <Container>
          <div className="admin-header">
            <div className="admin-header__box">
              <div className="admin-header__top">
                <h3>Gestión de Usuarios</h3>
                <button
                  type="button"
                  className="admin-header__back"
                  onClick={() => navigate('/admin')}
                >
                  <FaArrowLeft />
                  <span>Volver</span>
                </button>
              </div>
            </div>
          </div>

          <div className="admin-section__box">
            <div className="usuarios-toolbar">
              <span />
              <button type="button" className="usuarios-btn-new" onClick={handleNew}>
                <FaPlus />
                <span>Crear nuevo usuario</span>
              </button>
            </div>

            <div className="usuarios-table-scroll">
              <table className="table usuarios-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Usuario</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th className="usuarios-th-actions">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pageData.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.nombre}</td>
                      <td>{u.username}</td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`usuarios-rol usuarios-rol--${u.rol.toLowerCase()}`}>
                          {u.rol}
                        </span>
                      </td>
                      <td className="usuarios-actions">
                        <button type="button" className="usuarios-action-btn" title="Editar" onClick={(e) => handleEdit(u, e)}>
                          <FaEdit />
                        </button>
                        <button type="button" className="usuarios-action-btn usuarios-action-btn--danger" title="Eliminar">
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="usuarios-footer">
              <span className="usuarios-footer__count">
                Total: <strong>{MOCK_USUARIOS.length}</strong> registros
              </span>
              <Pagination className="usuarios-pagination">
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
          </div>
        </Container>
      </main>

      <Modal show={showModal} onHide={handleClose} centered size="md" className="usuarios-modal">
        <div className="usuarios-modal__header">
          <h4 className="usuarios-modal__title">
            {editUser ? 'Editar usuario' : 'Nuevo usuario'}
          </h4>
          <div className="usuarios-modal__header-actions">
            <button type="button" className="usuarios-modal__icon-btn" title="Guardar">
              <FaSave />
            </button>
            <button type="button" className="usuarios-modal__icon-btn usuarios-modal__icon-btn--cancel" title="Cancelar" onClick={handleClose}>
              <FaTimes />
            </button>
          </div>
        </div>
        <div className="usuarios-modal__body">
          <div className="usuarios-modal__field">
            <label className="usuarios-modal__label">Nombre completo</label>
            <input
              type="text"
              className="usuarios-modal__input"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              placeholder="Ej: Juan Pérez"
            />
          </div>
          <div className="usuarios-modal__field">
            <label className="usuarios-modal__label">Usuario</label>
            <input
              type="text"
              className="usuarios-modal__input"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Ej: jperez"
            />
          </div>
          <div className="usuarios-modal__field">
            <label className="usuarios-modal__label">Correo electrónico</label>
            <input
              type="email"
              className="usuarios-modal__input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Ej: jperez@correo.com"
            />
          </div>
          <div className="usuarios-modal__field">
            <label className="usuarios-modal__label">Rol</label>
            <select
              className="usuarios-modal__input usuarios-modal__select"
              value={formData.rol}
              onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
            >
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Lector">Lector</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Usuarios;
