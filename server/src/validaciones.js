const jwt = require('jsonwebtoken');
const moment = require('moment');
const validaciones = {};

moment.locale('es');

// Funcion que valida la existencia de un token por usuario
validaciones.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).json({ message: "No esta autorizado para ver esto" });
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') return res.status(401).json({ message: "No esta autorizado para ver esto" });

    let payload = jwt.verify(token, 'secretkey');
    req.user_email = payload._id;
    next();
}

// Valida campo vacio
validaciones.campoVacio = (valor) => {
    if (valor === "" || valor === null) {
        return true;
    }
    return false;
}

validaciones.changeFormatDate = (fecha, format) => {
    return moment(fecha).format(format)
}

module.exports = validaciones;