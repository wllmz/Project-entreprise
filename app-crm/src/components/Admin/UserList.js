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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h3 className="text-xl mb-4 bg-white">Liste des utilisateurs :</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nom d'utilisateur</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Rôle</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="py-2 px-4">{user.username}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4">
                  <div className="flex flex-col sm:flex-row sm:space-x-2">
                    <button
                      onClick={() => handleOpenModal(user, 'changeRole')}
                      className="bg-blue-500 text-white p-2 rounded mb-2 sm:mb-0"
                    >
                      Changer le rôle
                    </button>
                    <button
                      onClick={() => handleOpenModal(user, 'deleteUser')}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
