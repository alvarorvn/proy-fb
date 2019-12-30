const jwt = require('jsonwebtoken');
const validaciones = {};

// Funcion que valida la existencia de un token por usuario
validaciones.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).json({ message: "No esta autorizado para ver esto" });
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') return res.status(401).json({ message: "No esta autorizado para ver esto" });

    let payload = jwt.verify(token, 'secretKey');
    req.user_email = payload._id;
    next();
}

module.exports = validaciones;