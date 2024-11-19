import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ModalWrapper from "./modals/ModalWrapper";
import UpdatePassword from "./modals/UpdatePassword";
import UpdateUsername from "./modals/UpdateUsername";
import UpdateEmail from "./modals/UpdateEmail";
import { FaEdit } from "react-icons/fa";
import { getCurrentUser } from "../../services/userService";

const Profile = () => {
  const { authState } = useContext(AuthContext); // Contient les informations utilisateur
  const [user, setUser] = useState(null); // État local pour les données utilisateur
  const [modalIsOpen, setModalIsOpen] = useState(false); // Gère l'état du modal
  const [currentModal, setCurrentModal] = useState(""); // Gère le type de modal ouvert

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser(); // Appel API pour récupérer l'utilisateur connecté
        setUser(response); // Met à jour les données utilisateur
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
    setCurrentModal(modalType); // Définit le type de modal
    setModalIsOpen(true); // Ouvre le modal
  };

  const closeModal = () => {
    setModalIsOpen(false); // Ferme le modal
    setCurrentModal(""); // Réinitialise le type de modal
  };

  if (!user) {
    return <div>Chargement...</div>; // Affiche un message de chargement si les données utilisateur ne sont pas encore disponibles
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
