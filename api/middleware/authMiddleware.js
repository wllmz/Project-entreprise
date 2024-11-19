export const AdminRole = (req, res, next) => {
  try {
    // Vérifie si le rôle de l'utilisateur est "admin"
    if (!req.user || req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Accès interdit : rôle admin requis." });
    }
    next();
  } catch (error) {
    console.error("Erreur dans AdminRole :", error.message);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
