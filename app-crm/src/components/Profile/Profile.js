import React, { useEffect, useState } from "react";
import ModalWrapper from "./modals/ModalWrapper";
import UpdatePassword from "./modals/UpdatePassword";
import UpdateUsername from "./modals/UpdateUsername";
import UpdateEmail from "./modals/UpdateEmail";
import { FaEdit } from "react-icons/fa";
import { getAuthenticatedUser } from "../../services/auth/authService";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getAuthenticatedUser();
        setUser(response);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur :",
          error
        );
      }
    };

    fetchUser();
  }, []);

  const openModal = (modalType) => {
    setCurrentModal(modalType);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentModal("");
  };

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow-md">
      <h2 className="text-2xl mb-4">Mon Profil</h2>
      <div className="mb-4 flex justify-between items-center">
        <p>
          <strong>Nom d'utilisateur:</strong> {user.username}
        </p>
        <FaEdit
          onClick={() => openModal("username")}
          className="text-blue-500 cursor-pointer"
        />
      </div>
      <div className="mb-4 flex justify-between items-center">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <FaEdit
          onClick={() => openModal("email")}
          className="text-blue-500 cursor-pointer"
        />
      </div>
      <div className="flex justify-between items-center">
        <p>
          <strong>Mot de passe:</strong> ********
        </p>
        <FaEdit
          onClick={() => openModal("password")}
          className="text-blue-500 cursor-pointer"
        />
      </div>

      {/* Modals */}
      <ModalWrapper isOpen={modalIsOpen} closeModal={closeModal}>
        {currentModal === "username" && (
          <UpdateUsername closeModal={closeModal} />
        )}
        {currentModal === "email" && <UpdateEmail closeModal={closeModal} />}
        {currentModal === "password" && (
          <UpdatePassword closeModal={closeModal} />
        )}
      </ModalWrapper>
    </div>
  );
};

export default Profile;
