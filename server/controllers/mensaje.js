const conexion = require("../database/conexion")
module.exports = {
    async insertarMensaje(mensaje_contenido,mensaje_fecha_hora,mensaje_estaleido,chat_id,usuario_id) {
        let resultados = await conexion.query(`insert into mensajes
        (mensaje_contenido, mensaje_fecha_hora, mensaje_estaleido, chat_id, usuario_id)
        values
        ($1,$2,$3,$4,$5)`, [mensaje_contenido,mensaje_fecha_hora,mensaje_estaleido,chat_id,usuario_id]);
        return resultados;
    },
    async obtenerMensajes(chat_id) {
        const resultados = await conexion.query(`select mensaje_contenido from mensajes where chat_id=$1 
        ORDER BY mensaje_fecha_hora asc`, [chat_id]);
        return resultados.rows;
    },
    async obtenerMensajesChat(chat_id) {
        const resultados = await conexion.query(`select mensaje_contenido from mensajes where chat_id=$1 
        ORDER BY mensaje_fecha_hora asc`, [chat_id]);
        return resultados.rows;
    },
    async obtenerPorId(mensaje_id) {
        const resultados = await conexion.query(`select mensaje_id from mensajes where mensaje_id = $1`, [mensaje_id]);
        return resultados.rows[0];
    },
    async eliminarMensaje(mensaje_id) {
        const resultados = conexion.query(`delete from mensajes
        where mensaje_id = $1`, [mensaje_id]);
        return resultados;
    },
    async eliminarMensajes(chat_id) {
        const resultados = conexion.query(`delete from mensajes
        where chat_id = $1`, [chat_id]);
        return resultados;
    },
}