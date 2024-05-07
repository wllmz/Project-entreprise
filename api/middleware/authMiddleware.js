
exports.AdminRole = (req, res, next) => {
    console.log(req.user); // Voir ce que contient req.user
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Admin role required.' });
    }
};
