CREATE TABLE usuarios
(
    user_id serial NOT NULL,
    user_nombres character varying(100),
    user_apellidos character varying(100),
    user_email character varying(150),
    user_password text,
    user_fecha_nac date,
    user_sexo character varying(50),
    user_acc_verify boolean,
    CONSTRAINT usuarios_pkey PRIMARY KEY (user_id)
)