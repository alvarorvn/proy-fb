const conexion = require("../database/conexion")
module.exports = {
    /**
     *  participante_id serial NOT NULL,
        participante_es text,
        participante_tipo text,
        participante_estado boolean,
        chat_id integer,
        comentario_id integer,
        grupo_id integer,
        respcom_id integer,
        pub_id integer,
        usuario_id integer,
        evento_id integer,
     */
    async insertarParticipanteporChat(participante_es,participante_estado,participante_tipo,chat_id,usuario_id) {
        let resultados = await conexion.query(`insert into participantes
        (participante_es,participante_estado,participante_tipo,chat_id,usuario_id
        values
        ($1,$2,$3,$4,$5)`, [participante_es,participante_estado,participante_tipo,chat_id,usuario_id]);
        return resultados;
    },
    async contarParticipantesChat(chat_id) {
        const resultados = await conexion.query(`SELECT 
        COUNT(participantes.participante_id)
      FROM 
        public.participantes, 
        public.chat
      WHERE 
        chat.chat_id=$1 AND
        participantes.chat_id = chat.chat_id`, [chat_id]);
        return resultados.rows;
    },
    async eliminarParticipanteChat(participante_id) {
        const resultados = conexion.query(`delete from participantes
        where participante_id = $1`, [participante_id]);
        return resultados;
    },
}