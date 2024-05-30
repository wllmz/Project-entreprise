import React, { useState } from 'react';
import ChangeUserRole from './modals/ChangeUserRole';
import DeleteUser from './modals/DeleteUser';
import ModalWrapper from './modals/ModalWrapper'; 

const UserList = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState('');

  const handleOpenModal = (user, type) => {
    setSelectedUser(user);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalType('');
  };

  return (
    <div>
      <h3 className="text-xl mb-4">Liste des utilisateurs</h3>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Nom d'utilisateur</th>
            <th className="py-2">Email</th>
            <th className="py-2">Rôle</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="py-2">{user.username}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">{user.role}</td>
              <td className="py-2 flex space-x-2">
                <button
                  onClick={() => handleOpenModal(user, 'changeRole')}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Changer le rôle
                </button>
                <button
                  onClick={() => handleOpenModal(user, 'deleteUser')}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && modalType === 'changeRole' && (
        <ModalWrapper isOpen={true} onClose={handleCloseModal}>
          <ChangeUserRole user={selectedUser} onClose={handleCloseModal} />
        </ModalWrapper>
      )}

      {selectedUser && modalType === 'deleteUser' && (
        <ModalWrapper isOpen={true} onClose={handleCloseModal}>
          <DeleteUser user={selectedUser} onClose={handleCloseModal} />
        </ModalWrapper>
      )}
    </div>
  );
};

export default UserList;
