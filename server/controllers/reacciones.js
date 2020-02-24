const conexion = require("../database/conexion")
module.exports = {
    /**
     *  reacc_id serial NOT NULL,
        reacc_descrip text,
        reacc_fecha_hora timestamp without time zone,
        reacc_tipo text,
        mensaje_id integer,
        pub_id integer,
        comentario_id integer,
        respcom_id integer,
        usuario_id integer,
     */
    async insertarReaccionesporMensaje(reacc_descrip,reacc_fecha_hora,reacc_tipo,mensaje_id,usuario_id) {
        let resultados = await conexion.query(`insert into reacciones
        (reacc_descrip,reacc_fecha_hora,reacc_tipo,mensaje_id,usuario_id
        values
        ($1,$2,$3,$4,$5)`, [reacc_descrip,reacc_fecha_hora,reacc_tipo,mensaje_id,usuario_id]);
        return resultados;
    },
    async obtenerReaccionesMensaje(mensaje_id) {
        const resultados = await conexion.query(`SELECT 
        reacciones.reacc_id, 
        reacciones.reacc_descrip, 
        reacciones.reacc_fecha_hora, 
        reacciones.reacc_tipo, 
        apodos.apodo_nombre
      FROM 
        public.reacciones, 
        public.mensajes, 
        public.usuario, 
        public.perfil_usuario, 
        public.apodos
      WHERE 
        mensajes.mensaje_id=$1 AND
        mensajes.mensaje_id = reacciones.mensaje_id AND
        mensajes.usuario_id = usuario.usuario_id AND
        usuario.usuario_id = perfil_usuario.usuario_id AND
        apodos.perfilusu_id = perfil_usuario.perfilusu_id`, [mensaje_id]);
        return resultados.rows;
    },
    async contarReaccionesTipoMensaje(mensaje_id,mensaje_descrip) {
        const resultados = await conexion.query(`SELECT 
        COUNT(reacc_id) 
      FROM 
        public.mensajes, 
        public.reacciones
      WHERE 
        reacciones.mensaje_id=$1 AND reacciones.reacc_descrip=$2 AND
        reacciones.mensaje_id = mensajes.mensaje_id`, [mensaje_id,mensaje_descrip]);
        return resultados.rows;
    },
}