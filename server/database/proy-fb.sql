CREATE DATABASE "proy-fb"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

CREATE TABLE public.usuarios
(
    user_id serial,
    user_nombres character varying(100),
    user_apellidos character varying(100),
    user_email character varying(150),
    user_password text,
    user_fecha_nac date,
    user_sexo character varying(50),
    user_acc_verify boolean,
    PRIMARY KEY (user_id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.usuarios
    OWNER to postgres;

