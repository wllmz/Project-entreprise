export const AdminRole = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Accès refusé. Rôle administrateur requis." });
  }
};
