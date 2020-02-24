const conexion = require("../database/conexion")
module.exports = {
    /**
     *  chat_id serial NOT NULL,
        chat_nombre character varying(20),
        chat_fecha_creacion timestamp without time zone,
     */
    async insertarChat(chat_nombre,chat_fecha_creacion) {
        let resultados = await conexion.query(`insert into chat
        (chat_nombre,chat_fecha_creacion
        values
        ($1,$2)`, [chat_nombre, chat_fecha_creacion]);
        return resultados;
    },
    async obtenerChat(chat_id) {
        const resultados = await conexion.query(`select mensaje_contenido from mensajes where chat_id=$1 
        ORDER BY mensaje_fecha_hora asc`, [chat_id]);
        return resultados.rows;
    },
    async obtenerMensajesChat(chat_id) {
        const resultados = await conexion.query(`SELECT 
        mensajes.mensaje_contenido, 
        mensajes.mensaje_fecha_hora, 
        mensajes.mensaje_estaleido, 
        mensajes.usuario_id
      FROM 
        public.chat, 
        public.mensajes, 
        public.participantes
      WHERE 
        mensaje.chat_id=$1
        mensajes.chat_id = chat.chat_id AND
        participantes.chat_id = chat.chat_id 
      ORDER BY mensaje_fecha_hora asc`, [chat_id]);
        return resultados.rows;
    },
    async obtenerParticipantesChat(chat_id) {
        const resultados = await conexion.query(`SELECT 
        chat.chat_nombre, 
        apodos.apodo_nombre, 
        usuario.usuario_conectado
      FROM 
        public.chat, 
        public.participantes, 
        public.usuario, 
        public.apodos, 
        public.perfil_usuario
      WHERE 
        chat.chat_id=$1 AND
        participantes.chat_id = chat.chat_id AND
        participantes.usuario_id = usuario.usuario_id AND
        usuario.usuario_id = perfil_usuario.usuario_id AND
        perfil_usuario.perfilusu_id = apodos.perfilusu_id`, [chat_id]);
        return resultados.rows;
    },
    async obtenerChatUser(user_id) {
        const resultados = await conexion.query(`SELECT *
      FROM 
        public.chat, 
        public.participantes, 
        public.usuario, 
        public.apodos, 
        public.perfil_usuario
      WHERE 
        participantes.usuario_id=$1
        participantes.chat_id = chat.chat_id AND
        participantes.usuario_id = usuario.usuario_id AND
        usuario.usuario_id = perfil_usuario.usuario_id AND
        perfil_usuario.perfilusu_id = apodos.perfilusu_id`, [user_id]);
        return resultados.rows;
    },
    async obtenerPorId(chat_id) {
        const resultados = await conexion.query(`select chat_id from chat where chat_id = $1`, [chat_id]);
        return resultados.rows[0];
    },
    async eliminarChat(chat_id) {
        const resultados = conexion.query(`delete from chat
        where chat_id = $1`, [chat_id]);
        return resultados;
    },
} 