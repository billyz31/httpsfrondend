import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { api } from '../config/api';

const UsersContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const UsersCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 30px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const AddUserForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 15px;
  margin-bottom: 30px;
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #333;
  font-weight: 500;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease;
  height: fit-content;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const UsersTable = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  background: #f8f9fa;
  padding: 15px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #e1e5e9;
`;

const TableCell = styled.td`
  padding: 15px;
  border-bottom: 1px solid #e1e5e9;
  color: #333;
`;

const TableRow = styled.tr`
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const RoleBadge = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  
  ${props => {
    switch (props.role) {
      case 'Admin':
        return 'background: #fee; color: #c33;';
      case 'Moderator':
        return 'background: #fef; color: #93c;';
      default:
        return 'background: #efe; color: #363;';
    }
  }}
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #fcc;
  margin: 16px 0;
`;

const SuccessMessage = styled.div`
  background: #efe;
  color: #363;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #cfc;
  margin: 16px 0;
`;

const ActionButton = styled.button`
  background: ${props => props.variant === 'edit' ? 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' : 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)'};
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  margin: 0 2px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.h3`
  margin: 0 0 20px 0;
  color: #333;
  text-align: center;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  ${props => props.variant === 'primary' ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
  ` : `
    background: #f5f5f5;
    color: #333;
    &:hover {
      background: #e0e0e0;
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'User'
  });
  const [submitting, setSubmitting] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.users.getAll();
      setUsers(response.data.data || []);
      setError(null);
    } catch (err) {
      setError('無法載入用戶數據');
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('請填寫所有必填欄位');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);

      await api.users.create(formData);
      
      setSuccess('用戶新增成功！');
      setFormData({ name: '', email: '', role: 'User' });
      
      // Refresh users list
      await fetchUsers();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('新增用戶失敗，請稍後再試');
      console.error('Failed to add user:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('請填寫所有必填欄位');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);

      await api.users.update(editingUser.id, formData);
      
      setSuccess('用戶更新成功！');
      setShowEditModal(false);
      setEditingUser(null);
      setFormData({ name: '', email: '', role: 'User' });
      
      // Refresh users list
      await fetchUsers();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('更新用戶失敗，請稍後再試');
      console.error('Failed to update user:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);

      await api.users.delete(userToDelete.id);
      
      setSuccess('用戶刪除成功！');
      setShowDeleteModal(false);
      setUserToDelete(null);
      
      // Refresh users list
      await fetchUsers();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('刪除用戶失敗，請稍後再試');
      console.error('Failed to delete user:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const cancelEdit = () => {
    setShowEditModal(false);
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'User' });
    setError(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  return (
    <UsersContainer>
      <PageTitle>用戶管理</PageTitle>
      
      <UsersCard>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>新增用戶</h2>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        <AddUserForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">姓名 *</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="請輸入姓名"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">電子郵件 *</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="請輸入電子郵件"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="role">角色</Label>
            <Select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="User">一般用戶</option>
              <option value="Moderator">管理員</option>
              <option value="Admin">系統管理員</option>
            </Select>
          </FormGroup>
          
          <AddButton type="submit" disabled={submitting}>
            {submitting ? '新增中...' : '新增用戶'}
          </AddButton>
        </AddUserForm>
      </UsersCard>

      <UsersCard>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>用戶列表</h2>
        
        {loading ? (
          <LoadingMessage>
            <div className="spinner" style={{ margin: '0 auto 20px' }}></div>
            載入中...
          </LoadingMessage>
        ) : (
          <UsersTable>
            <Table>
              <thead>
                <tr>
                  <TableHeader>ID</TableHeader>
                  <TableHeader>姓名</TableHeader>
                  <TableHeader>電子郵件</TableHeader>
                  <TableHeader>角色</TableHeader>
                  <TableHeader>操作</TableHeader>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <RoleBadge role={user.role}>{user.role}</RoleBadge>
                    </TableCell>
                    <TableCell>
                      <ActionButton 
                        variant="edit" 
                        onClick={() => handleEdit(user)}
                        disabled={submitting}
                      >
                        編輯
                      </ActionButton>
                      <ActionButton 
                        variant="delete" 
                        onClick={() => handleDelete(user)}
                        disabled={submitting}
                      >
                        刪除
                      </ActionButton>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
            
            {users.length === 0 && (
              <LoadingMessage>暫無用戶數據</LoadingMessage>
            )}
          </UsersTable>
        )}
      </UsersCard>

      {/* Edit Modal */}
      {showEditModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>編輯用戶</ModalHeader>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <form onSubmit={handleEditSubmit}>
              <FormGroup style={{ marginBottom: '15px' }}>
                <Label htmlFor="edit-name">姓名 *</Label>
                <Input
                  type="text"
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="請輸入姓名"
                  required
                />
              </FormGroup>
              
              <FormGroup style={{ marginBottom: '15px' }}>
                <Label htmlFor="edit-email">電子郵件 *</Label>
                <Input
                  type="email"
                  id="edit-email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="請輸入電子郵件"
                  required
                />
              </FormGroup>
              
              <FormGroup style={{ marginBottom: '20px' }}>
                <Label htmlFor="edit-role">角色</Label>
                <Select
                  id="edit-role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="User">一般用戶</option>
                  <option value="Moderator">管理員</option>
                  <option value="Admin">系統管理員</option>
                </Select>
              </FormGroup>
              
              <ModalButtons>
                <ModalButton type="button" onClick={cancelEdit} disabled={submitting}>
                  取消
                </ModalButton>
                <ModalButton type="submit" variant="primary" disabled={submitting}>
                  {submitting ? '更新中...' : '更新用戶'}
                </ModalButton>
              </ModalButtons>
            </form>
          </ModalContent>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>確認刪除</ModalHeader>
            <p style={{ textAlign: 'center', margin: '20px 0', color: '#333' }}>
              確定要刪除用戶 <strong>{userToDelete?.name}</strong> 嗎？
              <br />
              此操作無法復原。
            </p>
            <ModalButtons>
              <ModalButton type="button" onClick={cancelDelete} disabled={submitting}>
                取消
              </ModalButton>
              <ModalButton 
                type="button" 
                variant="primary" 
                onClick={confirmDelete} 
                disabled={submitting}
                style={{ background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)' }}
              >
                {submitting ? '刪除中...' : '確認刪除'}
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}
    </UsersContainer>
  );
}

export default Users;