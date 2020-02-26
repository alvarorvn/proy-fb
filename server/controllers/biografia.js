const fs = require('fs');
const path = require('path');
const validar = require('../src/validaciones');
const pool = require('../database/conexion');

// Funcion de registro de empleo
async function addEmpleo(req, res) {
    const { empleo_empresa, empleo_puesto, empleo_detalle, empleo_fechainicio, empleo_fechafin, perfilusu_id } = req.body;
    if (validar.campoVacio(empleo_empresa) || validar.campoVacio(empleo_puesto) ||
        validar.campoVacio(empleo_fechainicio) || validar.campoVacio(empleo_fechafin) || validar.campoVacio(perfilusu_id))
        return res.json({ message: "Llene el formulario por favor", tipo: 'error' });

    try {
        /*let query = `SELECT * FROM usuario WHERE usuario_email = '${usuario_email}'`;
        let result = await pool.query(query);

        if (result.rowCount > 0) return res.json({ message: "Ya existe un usuario registrado con este correo", tipo: 'error' });*/

        query = `INSERT INTO empleo
                    (empleo_empresa, empleo_puesto, empleo_detalle, empleo_fechainicio, empleo_fechafin, perfilusu_id) 
                    VALUES ('${empleo_empresa}','${empleo_puesto}','${empleo_detalle}','${empleo_fechainicio}','${empleo_fechafin}','${perfilusu_id}')`;
        result = await pool.query(query);
        if (result.rowCount == 1) return res.json({ message: "Empleo registrado con exito", tipo: "exito" });
    } catch (error) {
        return res.json({ message: "Error al agregar empleo" });
    }
}

// Obtener todos los empleos
async function getEmpleos(req, res) {
    let query = `SELECT * FROM empleo WHERE perfilusu_id = ${req.params.perfilID}`;
    let result = await pool.query(query);
    if (result.rows == 0) return res.json({ message: "No hay empleos registrados", result: [] });
    result.rows.forEach(item => {
        item.empleo_fechainicio = validar.changeFormatDate(item.empleo_fechainicio, 'YYYY-MM-DD');
        item.empleo_fechafin = validar.changeFormatDate(item.empleo_fechafin, 'YYYY-MM-DD');
        item.empleo_fechainicioM = validar.changeFormatDate(item.empleo_fechainicio, 'DD [de] MMMM [de] YYYY');
        item.empleo_fechafinM = validar.changeFormatDate(item.empleo_fechafin, 'DD [de] MMMM [de] YYYY');
    });
    res.json(result.rows);
}

// Elimina empleo
async function deteleEmpleo(req, res) {
    try {
        let sql = `DELETE FROM empleo where empleo_id = '${req.params.empleoID}'`;
        let result = await pool.query(sql);
        if (result == 0) return res.json({ message: "No existe empleo a eliminar", tipo: "error" });
        return res.json({ message: "Empleo eliminado con exito", tipo: "exito" });
    } catch (err) {
        return res.json({ message: "Error al eliminar empleo", tipo: "error" });
    }
}

// Actualiza empleo
async function updateEmpleo(req, res) {
    const { empleo_empresa, empleo_puesto, empleo_detalle, empleo_fechainicio, empleo_fechafin, perfilusu_id } = req.body;
    if (validar.campoVacio(empleo_empresa) || validar.campoVacio(empleo_puesto) ||
        validar.campoVacio(empleo_fechainicio) || validar.campoVacio(empleo_fechafin) || validar.campoVacio(perfilusu_id))
        return res.json({ message: "Llene el formulario por favor", tipo: 'error' });

    try {
        let sql = `SELECT * FROM empleo where empleo_id = '${req.params.empleoID}'`;
        let result = await pool.query(sql);
        if (result.rowCount == 0) return res.json({ message: "No existe empleo registrado a editar", tipo: "error" });
        sql = `UPDATE empleo SET
            empleo_empresa = '${empleo_empresa}', empleo_puesto = '${empleo_puesto}', 
            empleo_detalle = '${empleo_detalle}', empleo_fechainicio = '${empleo_fechainicio}',
            empleo_fechafin = '${empleo_fechafin}', perfilusu_id= '${perfilusu_id}'
            WHERE empleo_id = '${req.params.empleoID}'`;
        result = await pool.query(sql);
        if (result.rowCount == 1) return res.json({ message: "Empleo actualizado con exito", tipo: "exito" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Error al actualizar empleo", tipo: "error" });
    }
}

// Registrar aptitud
async function addAptitud(req, res) {
    const { habprof_aptitud, perfilusu_id } = req.body;
    if (validar.campoVacio(habprof_aptitud) || validar.campoVacio(perfilusu_id))
        return res.json({ message: "Llene el formulario por favor", tipo: 'error' });

    try {
        /*let query = `SELECT * FROM usuario WHERE usuario_email = '${usuario_email}'`;
        let result = await pool.query(query);

        if (result.rowCount > 0) return res.json({ message: "Ya existe un usuario registrado con este correo", tipo: 'error' });*/

        query = `INSERT INTO habilidad_profesional
                    (habprof_aptitud, perfilusu_id) 
                    VALUES ('${habprof_aptitud}','${perfilusu_id}')`;
        result = await pool.query(query);
        if (result.rowCount == 1) return res.json({ message: "Aptitud registrada con exito", tipo: "exito" });
    } catch (error) {
        return res.json({ message: "Error al agregar aptitud", tipo: 'error' });
    }
}

// Obtener aptitudes
async function getAptitudes(req, res) {
    let query = `SELECT * FROM habilidad_profesional WHERE perfilusu_id = ${req.params.perfilID}`;
    let result = await pool.query(query);
    if (result.rows == 0) return res.json({ message: "No hay aptitudes registradas", result: [] });
    res.json(result.rows);
}

// Elimina aptitud
async function deteleAptitud(req, res) {
    try {
        let sql = `DELETE FROM habilidad_profesional where habprof_id = '${req.params.aptitudID}'`;
        let result = await pool.query(sql);
        if (result == 0) return res.json({ message: "No existe aptitud a eliminar", tipo: "error" });
        return res.json({ message: "Aptitud eliminada con exito", tipo: "exito" });
    } catch (err) {
        return res.json({ message: "Error al eliminar aptitud", tipo: "error" });
    }
}

// Actualiza aptitud
async function updateAptitud(req, res) {
    const { habprof_aptitud, perfilusu_id } = req.body;
    if (validar.campoVacio(habprof_aptitud) || validar.campoVacio(perfilusu_id))
        return res.json({ message: "Llene el formulario por favor", tipo: 'error' });

    try {
        let sql = `SELECT * FROM habilidad_profesional where habprof_id = '${req.params.aptitudID}'`;
        let result = await pool.query(sql);
        if (result.rowCount == 0) return res.json({ message: "No existe aptitud registrado a editar", tipo: "error" });
        sql = `UPDATE habilidad_profesional SET
            habprof_aptitud = '${habprof_aptitud}', perfilusu_id= '${perfilusu_id}'
            WHERE habprof_id = '${req.params.aptitudID}'`;
        result = await pool.query(sql);
        if (result.rowCount == 1) return res.json({ message: "Aptitud actualizado con exito", tipo: "exito" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Error al actualizar aptitud", tipo: "error" });
    }
}

// Registrar estudio
async function addEstudio(req, res) {
    const { univ_centroeduc, univ_fechainicio, univ_fechafin, univ_detalle, univ_especialidad, univ_finalizada, perfilusu_id } = req.body;
    if (validar.campoVacio(univ_centroeduc) || validar.campoVacio(univ_fechainicio) || validar.campoVacio(univ_fechafin) ||
        validar.campoVacio(univ_especialidad) || validar.campoVacio(perfilusu_id))
        return res.json({ message: "Llene el formulario por favor", tipo: 'error' });

    try {
        /*let query = `SELECT * FROM usuario WHERE usuario_email = '${usuario_email}'`;
        let result = await pool.query(query);

        if (result.rowCount > 0) return res.json({ message: "Ya existe un usuario registrado con este correo", tipo: 'error' });*/

        query = `INSERT INTO universidad
                    (univ_centroeduc, univ_fechainicio, univ_fechafin, univ_detalle, univ_especialidad, univ_finalizada, perfilusu_id) 
                    VALUES ('${univ_centroeduc}','${univ_fechainicio}','${univ_fechafin}','${univ_detalle}','${univ_especialidad}'
                                ,'${univ_finalizada}','${perfilusu_id}')`;
        result = await pool.query(query);
        if (result.rowCount == 1) return res.json({ message: "Estudio registrado con exito", tipo: "exito" });
    } catch (error) {
        return res.json({ message: "Error al agregar estudio", tipo: 'error' });
    }
}

// Obtener estudios
async function getEstudios(req, res) {
    let query = `SELECT * FROM universidad WHERE perfilusu_id = ${req.params.perfilID}`;
    let result = await pool.query(query);
    if (result.rows == 0) return res.json({ message: "No hay estudios registradas", result: [] });
    result.rows.forEach(item => {
        item.univ_fechainicio = validar.changeFormatDate(item.univ_fechainicio, 'YYYY-MM-DD');
        item.univ_fechafin = validar.changeFormatDate(item.univ_fechafin, 'YYYY-MM-DD');
        item.univ_fechainicioM = validar.changeFormatDate(item.univ_fechainicio, 'DD [de] MMMM [de] YYYY');
        item.univ_fechafinM = validar.changeFormatDate(item.univ_fechafin, 'DD [de] MMMM [de] YYYY');
        item.promocion = validar.changeFormatDate(item.univ_fechafin, 'YYYY');
    });
    res.json(result.rows);
}

// Elimina estudio
async function deleteEstudio(req, res) {
    try {
        let sql = `DELETE FROM universidad where univ_id = '${req.params.univID}'`;
        let result = await pool.query(sql);
        if (result == 0) return res.json({ message: "No existe estudio a eliminar", tipo: "error" });
        return res.json({ message: "Estudio eliminado con exito", tipo: "exito" });
    } catch (err) {
        return res.json({ message: "Error al eliminar estudio", tipo: "error" });
    }
}

// Actualiza estudio
async function updateEstudio(req, res) {
    const { univ_centroeduc, univ_fechainicio, univ_fechafin, univ_detalle, univ_especialidad, univ_finalizada, perfilusu_id } = req.body;
    if (validar.campoVacio(univ_centroeduc) || validar.campoVacio(univ_fechainicio) || validar.campoVacio(univ_fechafin) ||
        validar.campoVacio(univ_especialidad) || validar.campoVacio(perfilusu_id))
        return res.json({ message: "Llene el formulario por favor", tipo: 'error' });
    try {
        let sql = `SELECT * FROM universidad where univ_id = '${req.params.univID}'`;
        let result = await pool.query(sql);
        if (result.rowCount == 0) return res.json({ message: "No existe estudio registrado a editar", tipo: "error" });
        sql = `UPDATE universidad SET
            univ_centroeduc = '${univ_centroeduc}', univ_fechainicio = '${univ_fechainicio}', univ_fechafin = '${univ_fechafin}', 
            univ_detalle = '${univ_detalle}', univ_especialidad = '${univ_especialidad}', univ_finalizada = '${univ_finalizada}', 
            perfilusu_id= '${perfilusu_id}'
            WHERE univ_id = '${req.params.univID}'`;
        result = await pool.query(sql);
        if (result.rowCount == 1) return res.json({ message: "Estudio actualizado con exito", tipo: "exito" });
    } catch (error) {
        return res.json({ message: "Error al actualizar estudio", tipo: "error" });
    }
}

// Registrar telefono
async function addTelefono(req, res) {
    const { telf_numero, perfilusu_id } = req.body;
    if (validar.campoVacio(telf_numero) || validar.campoVacio(perfilusu_id))
        return res.json({ message: "Llene el formulario por favor", tipo: 'error' });

    try {
        /*let query = `SELECT * FROM usuario WHERE usuario_email = '${usuario_email}'`;
        let result = await pool.query(query);

        if (result.rowCount > 0) return res.json({ message: "Ya existe un usuario registrado con este correo", tipo: 'error' });*/

        query = `INSERT INTO telefono
                    (telf_numero, perfilusu_id) 
                    VALUES ('${telf_numero}','${perfilusu_id}')`;
        result = await pool.query(query);
        if (result.rowCount == 1) return res.json({ message: "Telefono registrado con exito", tipo: "exito" });
    } catch (error) {
        return res.json({ message: "Error al agregar telefono", tipo: 'error' });
    }
}

// Obtener telefonos
async function getTelefonos(req, res) {
    let query = `SELECT * FROM telefono WHERE perfilusu_id = ${req.params.perfilID}`;
    let result = await pool.query(query);
    if (result.rows == 0) return res.json({ message: "No hay telefonos registrados", result: [] });
    res.json(result.rows);
}

// Elimina telefono
async function deleteTelefono(req, res) {
    try {
        let sql = `DELETE FROM telefono where telf_id = '${req.params.telfID}'`;
        let result = await pool.query(sql);
        if (result == 0) return res.json({ message: "No existe telefono a eliminar", tipo: "error" });
        return res.json({ message: "Telefono eliminado con exito", tipo: "exito" });
    } catch (err) {
        return res.json({ message: "Error al eliminar telefono", tipo: "error" });
    }
}

// Actualiza telefono
async function updateTelefono(req, res) {
    const { telf_numero, perfilusu_id } = req.body;
    if (validar.campoVacio(telf_numero) || validar.campoVacio(perfilusu_id))
        return res.json({ message: "Llene el formulario por favor", tipo: 'error' });

    try {
        let sql = `SELECT * FROM telefono where telf_id = '${req.params.telfID}'`;
        let result = await pool.query(sql);
        if (result.rowCount == 0) return res.json({ message: "No existe telefono registrado a editar", tipo: "error" });
        sql = `UPDATE telefono SET
            telf_numero = '${telf_numero}', perfilusu_id= '${perfilusu_id}'
            WHERE telf_id = '${req.params.telfID}'`;
        result = await pool.query(sql);
        if (result.rowCount == 1) return res.json({ message: "Telefono actualizado con exito", tipo: "exito" });
    } catch (error) {
        return res.json({ message: "Error al actualizar telefono", tipo: "error" });
    }
}

// Registrar direccion
async function addDireccion(req, res) {
    const { dir_detalle, dir_codigopostal, perfilusu_id, ciud_id } = req.body;
    if (validar.campoVacio(dir_detalle) || validar.campoVacio(perfilusu_id) || validar.campoVacio(ciud_id))
        return res.json({ message: "Llene el formulario por favor", tipo: 'error' });

    try {
        /*let query = `SELECT * FROM usuario WHERE usuario_email = '${usuario_email}'`;
        let result = await pool.query(query);

        if (result.rowCount > 0) return res.json({ message: "Ya existe un usuario registrado con este correo", tipo: 'error' });*/

        query = `INSERT INTO direccion
                    (dir_detalle, dir_codigopostal, perfilusu_id, ciud_id) 
                    VALUES ('${dir_detalle}','${dir_codigopostal}','${perfilusu_id}','${ciud_id}')`;
        result = await pool.query(query);
        if (result.rowCount == 1) return res.json({ message: "Direccion registrada con exito", tipo: "exito" });
    } catch (error) {
        return res.json({ message: "Error al agregar direccion", tipo: 'error' });
    }
}

// Obtener direcciones
async function getDirecciones(req, res) {
    let query = `SELECT * FROM direccion as d, ciudad as c WHERE perfilusu_id = ${req.params.perfilID} AND d.ciud_id = c.ciud_id`;
    let result = await pool.query(query);
    if (result.rows == 0) return res.json({ message: "No hay direcciones registrados", result: [] });
    res.json(result.rows);
}

// Elimina direccion
async function deleteDireccion(req, res) {
    try {
        let sql = `DELETE FROM direccion where dir_id = '${req.params.dirID}'`;
        let result = await pool.query(sql);
        if (result == 0) return res.json({ message: "No existe direccion a eliminar", tipo: "error" });
        return res.json({ message: "Direccion eliminada con exito", tipo: "exito" });
    } catch (err) {
        return res.json({ message: "Error al eliminar direccion", tipo: "error" });
    }
}

// Actualiza direccion
async function updateDireccion(req, res) {
    const { dir_detalle, dir_codigopostal, perfilusu_id, ciud_id } = req.body;
    if (validar.campoVacio(dir_detalle) || validar.campoVacio(perfilusu_id) || validar.campoVacio(ciud_id))
        return res.json({ message: "Llene el formulario por favor", tipo: 'error' });


    try {
        let sql = `SELECT * FROM direccion where dir_id = '${req.params.dirID}'`;
        let result = await pool.query(sql);
        if (result.rowCount == 0) return res.json({ message: "No existe direccion registrada a editar", tipo: "error" });
        sql = `UPDATE direccion SET
            dir_detalle = '${dir_detalle}', dir_codigopostal= '${dir_codigopostal}', perfilusu_id= '${perfilusu_id}', 
            ciud_id= '${ciud_id}'
            WHERE dir_id = '${req.params.dirID}'`;
        result = await pool.query(sql);
        if (result.rowCount == 1) return res.json({ message: "Direccion actualizada con exito", tipo: "exito" });
    } catch (error) {
        return res.json({ message: "Error al actualizar direccion", tipo: "error" });
    }
}

// Codifica imagen
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return Buffer.from(bitmap).toString('base64');
}

// Actualiza religion
async function updateReligion(req, res) {
    const { perfil_religion } = req.body;
    if (validar.campoVacio(perfil_religion)) return res.json({ message: "Llene el formulario por favor", tipo: 'error' });

    try {
        let sql = `SELECT * FROM perfil_usuario where perfilusu_id = ${req.params.perfilID}`;
        let result = await pool.query(sql);
        if (result.rowCount == 0) return res.json({ message: "No existe religion a editar", tipo: "error" });
        sql = `UPDATE perfil_usuario SET
            perfil_religion = '${perfil_religion}' WHERE perfilusu_id = ${req.params.perfilID}`;
        result = await pool.query(sql);
        if (result.rowCount == 1) return res.json({ message: "Religion actualizada con exito", tipo: "exito" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Error al actualizar religion", tipo: "error" });
    }
}

// Actualiza interes
async function updateInteres(req, res) {
    const { perfil_interes } = req.body;
    if (validar.campoVacio(perfil_interes)) return res.json({ message: "Llene el formulario por favor", tipo: 'error' });

    try {
        let sql = `SELECT * FROM perfil_usuario where perfilusu_id = ${req.params.perfilID}`;
        let result = await pool.query(sql);
        if (result.rowCount == 0) return res.json({ message: "No existe interes a editar", tipo: "error" });
        sql = `UPDATE perfil_usuario SET
                perfil_interes = '${perfil_interes}' WHERE perfilusu_id = ${req.params.perfilID}`;
        result = await pool.query(sql);
        if (result.rowCount == 1) return res.json({ message: "Interes actualizado con exito", tipo: "exito" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Error al actualizar interes", tipo: "error" });
    }
}

// Actualiza informacion
async function updateInformacion(req, res) {
    const { perfil_informacion } = req.body;
    //if (validar.campoVacio(perfil_informacion)) return res.json({ message: "Llene el formulario por favor", tipo: 'error' });

    try {
        let sql = `SELECT * FROM perfil_usuario where perfilusu_id = ${req.params.perfilID}`;
        let result = await pool.query(sql);
        if (result.rowCount == 0) return res.json({ message: "No existe informacion a editar", tipo: "error" });
        sql = `UPDATE perfil_usuario SET
                perfil_informacion = '${perfil_informacion}' WHERE perfilusu_id = ${req.params.perfilID}`;
        result = await pool.query(sql);
        if (result.rowCount == 1) return res.json({ message: "Informacion actualizada con exito", tipo: "exito" });
    } catch (error) {
        return res.json({ message: "Error al actualizar informacion", tipo: "error" });
    }
}

// Registrar apodo
async function addApodo(req, res) {
    const { apodo_nombre, perfilusu_id } = req.body;
    if (validar.campoVacio(apodo_nombre) || validar.campoVacio(perfilusu_id))
        return res.json({ message: "Llene el formulario por favor", tipo: 'error' });

    try {
        /*let query = `SELECT * FROM usuario WHERE usuario_email = '${usuario_email}'`;
        let result = await pool.query(query);

        if (result.rowCount > 0) return res.json({ message: "Ya existe un usuario registrado con este correo", tipo: 'error' });*/

        query = `INSERT INTO apodos
                    (apodo_nombre, perfilusu_id) 
                    VALUES ('${apodo_nombre}','${perfilusu_id}')`;
        result = await pool.query(query);
        if (result.rowCount == 1) return res.json({ message: "Apodo registrado con exito", tipo: "exito" });
    } catch (error) {
        return res.json({ message: "Error al agregar apodo", tipo: 'error' });
    }
}

// Obtener apodos
async function getApodos(req, res) {
    let query = `SELECT * FROM apodos WHERE perfilusu_id = ${req.params.perfilID}`;
    let result = await pool.query(query);
    if (result.rows == 0) return res.json({ message: "No hay apodos registrados", result: [] });
    res.json(result.rows);
}

// Elimina apodo
async function deleteApodo(req, res) {
    try {
        let sql = `DELETE FROM apodos where apodo_id = '${req.params.apodoID}'`;
        let result = await pool.query(sql);
        if (result == 0) return res.json({ message: "No existe apodo a eliminar", tipo: "error" });
        return res.json({ message: "Apodo eliminado con exito", tipo: "exito" });
    } catch (err) {
        return res.json({ message: "Error al eliminar apodo", tipo: "error" });
    }
}

// Actualiza apodo
async function updateApodo(req, res) {
    const { apodo_nombre, perfilusu_id } = req.body;
    if (validar.campoVacio(apodo_nombre) || validar.campoVacio(perfilusu_id))
        return res.json({ message: "Llene el formulario por favor", tipo: 'error' });


    try {
        let sql = `SELECT * FROM apodos where apodo_id = '${req.params.apodoID}'`;
        let result = await pool.query(sql);
        if (result.rowCount == 0) return res.json({ message: "No existe apodo registrada a editar", tipo: "error" });
        sql = `UPDATE apodos SET
            apodo_nombre = '${apodo_nombre}', perfilusu_id= '${perfilusu_id}'
            WHERE apodo_id = '${req.params.apodoID}'`;
        result = await pool.query(sql);
        if (result.rowCount == 1) return res.json({ message: "Apodo actualizado con exito", tipo: "exito" });
    } catch (error) {
        return res.json({ message: "Error al actualizar apodo", tipo: "error" });
    }
}

// Registra seguidor
async function addSeguidor(req, res) {
    const { seguido_tipo, pagina_id, usuario_id_sigue, usuario_id } = req.body;
    /*if (validar.campoVacio(dir_detalle) || validar.campoVacio(perfilusu_id) || validar.campoVacio(ciud_id))
        return res.json({ message: "Llene el formulario por favor", tipo: 'error' });*/

    try {
        /*let query = `SELECT * FROM usuario WHERE usuario_email = '${usuario_email}'`;
        let result = await pool.query(query);

        if (result.rowCount > 0) return res.json({ message: "Ya existe un usuario registrado con este correo", tipo: 'error' });*/

        query = `INSERT INTO seguidos
                    (seguido_tipo, pagina_id, usuario_id_sigue, usuario_id) 
                    VALUES ('${seguido_tipo}',${pagina_id},'${usuario_id_sigue}','${usuario_id}')`;
        result = await pool.query(query);
        if (result.rowCount == 1) return res.json({ message: "Ahora sigues a este usuario", tipo: "exito" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Error al seguir a este usuario", tipo: 'error' });
    }
}

// Elimina seguidor
async function deleteSeguidor(req, res) {
    const { usuario_id_sigue, usuario_id } = req.body;
    try {
        let sql = `DELETE FROM seguidos WHERE usuario_id_sigue = ${usuario_id_sigue} AND usuario_id = ${usuario_id}`;
        let result = await pool.query(sql);
        if (result.rowCount == 0) return res.json({ message: "No estas siguiendo a este usuario", tipo: "error" });
        return res.json({ message: "Dejaste de seguir a este usuario", tipo: "exito" });
    } catch (err) {
        console.log(err);
        return res.json({ message: "Error al dejar de seguir a este usuario", tipo: "error" });
    }
}

// Registra solictud de amistad
async function addSoli(req, res) {
    const { solic_estado, usuario_id_recepta, usuario_id_envia } = req.body;
    /*if (validar.campoVacio(dir_detalle) || validar.campoVacio(perfilusu_id) || validar.campoVacio(ciud_id))
        return res.json({ message: "Llene el formulario por favor", tipo: 'error' });*/

    try {
        /*let query = `SELECT * FROM usuario WHERE usuario_email = '${usuario_email}'`;
        let result = await pool.query(query);

        if (result.rowCount > 0) return res.json({ message: "Ya existe un usuario registrado con este correo", tipo: 'error' });*/

        query = `INSERT INTO solic_amistad
                    (solic_estado, usuario_id_recepta, usuario_id_envia) 
                    VALUES ('${solic_estado}',${usuario_id_recepta},'${usuario_id_envia}')`;
        result = await pool.query(query);
        if (result.rowCount == 1) return res.json({ message: "Solicitud de amistad enviada", tipo: "exito" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Error al enviar solicitud de amistad", tipo: 'error' });
    }
}

// Obtener solicitudes de amistad enviadas de un usuario
async function getSoliEnviadas(req, res) {
    let query = `SELECT * FROM solic_amistad WHERE usuario_id_envia = ${req.params.iduser}`;
    let result = await pool.query(query);
    if (result.rows == 0) return res.json({ message: "No hay solicitudes enviadas", result: [], tipo: 'error' });
    res.json(result.rows);
}

// Elimina solicitud de amistad
async function deleteSolicitud(req, res) {
    const { usuario_id_recepta, usuario_id_envia } = req.body;
    try {
        let sql = `DELETE FROM solic_amistad WHERE usuario_id_recepta = ${usuario_id_recepta} AND usuario_id_envia = ${usuario_id_envia}`;
        let result = await pool.query(sql);
        if (result.rowCount == 0) return res.json({ message: "No has enviado solicitud de amistad para este usuario", tipo: "error" });
        return res.json({ message: "Solicitud de amistad cancelada", tipo: "exito" });
    } catch (err) {
        console.log(err);
        return res.json({ message: "Error al dejar de seguir a este usuario", tipo: "error" });
    }
}

// Obtener solicitudes de amistad recibidas de un usuario
async function getSoliRecibidas(req, res) {
    let query = `SELECT * FROM solic_amistad as s, usuario as u, perfil_usuario as p
                    WHERE s.usuario_id_recepta = ${req.params.iduser} AND s.usuario_id_envia = u.usuario_id
                    AND p.usuario_id = s.usuario_id_envia`;
    let result = await pool.query(query);
    if (result.rows == 0) return res.json({ message: "No hay solicitudes recibidas", result: [], tipo: 'error' });
    result.rows.forEach(usuario => {
        if (usuario.perfil_path_foto != "") {
            var base64str = base64_encode(usuario.perfil_path_foto);
            usuario.image_perfil = base64str;
        }
    });
    res.json(result.rows);
}

module.exports = {
    addEmpleo, getEmpleos, deteleEmpleo, updateEmpleo,
    addAptitud, getAptitudes, deteleAptitud, updateAptitud,
    addEstudio, getEstudios, deleteEstudio, updateEstudio,
    addTelefono, getTelefonos, deleteTelefono, updateTelefono,
    addDireccion, getDirecciones, deleteDireccion, updateDireccion,
    updateReligion, updateInteres, updateInformacion,
    addApodo, getApodos, deleteApodo, updateApodo,
    addSeguidor, deleteSeguidor,
    addSoli, getSoliEnviadas, deleteSolicitud, getSoliRecibidas
};