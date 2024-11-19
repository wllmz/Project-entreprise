import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const EMAIL_USER = process.env.MAIL_USER;
const EMAIL_PASSWORD = process.env.MAIL_PASSWORD;

// Créer le transporteur
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

// Fonction pour envoyer l'email de vérification
export const sendVerificationEmail = async (email) => {
  const verificationLink = `http://localhost:5000/api/auth/verify-email?email=${encodeURIComponent(
    email
  )}`;

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: "Vérification de votre email",
    html: `
      <p>Merci de vérifier votre email en cliquant sur le lien suivant :</p>
      <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; color: white; background-color: blue; text-decoration: none;">Vérifier mon email</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email de vérification envoyé à : " + email);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de vérification :", error);
  }
};
