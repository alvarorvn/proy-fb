PGDMP         +                x            proyecto_redsocial    10.11    10.11 g   �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            �           1262    33500    proyecto_redsocial    DATABASE     �   CREATE DATABASE proyecto_redsocial WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Ecuador.1252' LC_CTYPE = 'Spanish_Ecuador.1252';
 "   DROP DATABASE proyecto_redsocial;
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        3079    12924    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            �           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    33501    amigos    TABLE     �   CREATE TABLE public.amigos (
    amig_id integer NOT NULL,
    amig_fecha date,
    usuario_id integer,
    usuario_id_amigo integer
)
WITH (autovacuum_enabled='true');
    DROP TABLE public.amigos;
       public         postgres    false    3            �            1259    33504    amigos_amig_id_seq    SEQUENCE     {   CREATE SEQUENCE public.amigos_amig_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.amigos_amig_id_seq;
       public       postgres    false    3    196            �           0    0    amigos_amig_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.amigos_amig_id_seq OWNED BY public.amigos.amig_id;
            public       postgres    false    197            �            1259    33506    apodos    TABLE     �   CREATE TABLE public.apodos (
    apodo_id integer NOT NULL,
    apodo_nombre text,
    perfilusu_id integer
)
WITH (autovacuum_enabled='true');
    DROP TABLE public.apodos;
       public         postgres    false    3            �            1259    33512    apodos_apodo_id_seq    SEQUENCE     |   CREATE SEQUENCE public.apodos_apodo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.apodos_apodo_id_seq;
       public       postgres    false    3    198            �           0    0    apodos_apodo_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.apodos_apodo_id_seq OWNED BY public.apodos.apodo_id;
            public       postgres    false    199            �            1259    33514 	   categoria    TABLE     y   CREATE TABLE public.categoria (
    categ_id integer NOT NULL,
    categ_nombre text
)
WITH (autovacuum_enabled='true');
    DROP TABLE public.categoria;
       public         postgres    false    3            �            1259    33520    categoria_categ_id_seq    SEQUENCE        CREATE SEQUENCE public.categoria_categ_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.categoria_categ_id_seq;
       public       postgres    false    200    3            �           0    0    categoria_categ_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.categoria_categ_id_seq OWNED BY public.categoria.categ_id;
            public       postgres    false    201            �            1259    33522    chat    TABLE     �   CREATE TABLE public.chat (
    chat_id integer NOT NULL,
    chat_nombre character varying(20),
    chat_fecha_creacion timestamp without time zone
)
WITH (autovacuum_enabled='true');
    DROP TABLE public.chat;
       public         postgres    false    3            �            1259    33525    chat_chat_id_seq    SEQUENCE     y   CREATE SEQUENCE public.chat_chat_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.chat_chat_id_seq;
       public       postgres    false    3    202            �           0    0    chat_chat_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.chat_chat_id_seq OWNED BY public.chat.chat_id;
            public       postgres    false    203            �            1259    33527    ciudad    TABLE     �   CREATE TABLE public.ciudad (
    ciud_id integer NOT NULL,
    ciud_nombre text,
    pais_id integer
)
WITH (autovacuum_enabled='true');
    DROP TABLE public.ciudad;
       public         postgres    false    3            �            1259    33533    ciudad_ciud_id_seq    SEQUENCE     {   CREATE SEQUENCE public.ciudad_ciud_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.ciudad_ciud_id_seq;
       public       postgres    false    3    204            �           0    0    ciudad_ciud_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.ciudad_ciud_id_seq OWNED BY public.ciudad.ciud_id;
            public       postgres    false    205            �            1259    33535    comentarios    TABLE     �   CREATE TABLE public.comentarios (
    comentario_id integer NOT NULL,
    comentario_contenido bigint,
    comentario_fecha_hora timestamp without time zone,
    pub_id integer,
    usuario_id integer
)
WITH (autovacuum_enabled='true');
    DROP TABLE public.comentarios;
       public         postgres    false    3            �            1259    33538    comentarios_comentario_id_seq    SEQUENCE     �   CREATE SEQUENCE public.comentarios_comentario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.comentarios_comentario_id_seq;
       public       postgres    false    3    206            �           0    0    comentarios_comentario_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.comentarios_comentario_id_seq OWNED BY public.comentarios.comentario_id;
            public       postgres    false    207            �            1259    33540 	   direccion    TABLE     �   CREATE TABLE public.direccion (
    dir_id integer NOT NULL,
    dir_detalle text,
    dir_codigopostal text,
    perfilusu_id integer,
    ciud_id integer
)
WITH (autovacuum_enabled='true');
    DROP TABLE public.direccion;
       public         postgres    false    3            �            1259    33546    direccion_dir_id_seq    SEQUENCE     }   CREATE SEQUENCE public.direccion_dir_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.direccion_dir_id_seq;
       public       postgres    false    208    3            �           0    0    direccion_dir_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.direccion_dir_id_seq OWNED BY public.direccion.dir_id;
            public       postgres    false    209            �            1259    33548    empleo    TABLE     �   CREATE TABLE public.empleo (
    empleo_id integer NOT NULL,
    empleo_empresa text,
    empleo_puesto text,
    empleo_detalle text,
    empleo_fechainicio date,
    empleo_fechafin date,
    perfilusu_id integer
)
WITH (autovacuum_enabled='true');
    DROP TABLE public.empleo;
       public         postgres    false    3            �            1259    33554    empleo_empleo_id_seq    SEQUENCE     }   CREATE SEQUENCE public.empleo_empleo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.empleo_empleo_id_seq;
       public       postgres    false    210    3            �           0    0    empleo_empleo_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.empleo_empleo_id_seq OWNED BY public.empleo.empleo_id;
            public       postgres    false    211            �            1259    33556    eventos    TABLE       CREATE TABLE public.eventos (
    evento_id integer NOT NULL,
    evento_logo text,
    evento_portada text,
    evento_tipo character varying(20),
    evento_fecha_hora timestamp without time zone,
    evento_lugar text,
    evento_nombre text
)
WITH (autovacuum_enabled='true');
    DROP TABLE public.eventos;
       public         postgres    false    3            �            1259    33562    eventos_evento_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.eventos_evento_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.eventos_evento_id_seq;
       public       postgres    false    3    212            �           0    0    eventos_evento_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.eventos_evento_id_seq OWNED BY public.eventos.evento_id;
            public       postgres    false    213            �            1259    33564 
   familiares    TABLE     �   CREATE TABLE public.familiares (
    fam_id integer NOT NULL,
    fam_relacion text,
    usuario_id_ integer,
    usuario_id_fam integer
)
WITH (autovacuum_enabled='true');
    DROP TABLE public.familiares;
       public         postgres    false    3            �            1259    33570    familiares_fam_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.familiares_fam_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.familiares_fam_id_seq;
       public       postgres    false    214    3            �           0    0    familiares_fam_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.familiares_fam_id_seq OWNED BY public.familiares.fam_id;
            public       postgres    false    215            �            1259    33572    grupos    TABLE     �   CREATE TABLE public.grupos (
    grupo_id integer NOT NULL,
    grupo_logo text,
    grupo_portada text,
    grupo_tipo text
)
WITH (autovacuum_enabled='true');
    DROP TABLE public.grupos;
       public         postgres    false    3            �            1259    33578    grupos_grupo_id_seq    SEQUENCE     |   CREATE SEQUENCE public.grupos_grupo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.grupos_grupo_id_seq;
       public       postgres    false    3    216            �           0    0    grupos_grupo_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.grupos_grupo_id_seq OWNED BY public.grupos.grupo_id;
            public       postgres    false    217            �            1259    33580    habilidad_profesional    TABLE     �   CREATE TABLE public.habilidad_profesional (
    habprof_id integer NOT NULL,
    habprof_aptitud text,
    perfilusu_id integer
)
WITH (autovacuum_enabled='true');
 )   DROP TABLE public.habilidad_profesional;
       public         postgres    false    3            �            1259    33586 $   habilidad_profesional_habprof_id_seq    SEQUENCE     �   CREATE SEQUENCE public.habilidad_profesional_habprof_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.habilidad_profesional_habprof_id_seq;
       public       postgres    false    3    218            �           0    0 $   habilidad_profesional_habprof_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.habilidad_profesional_habprof_id_seq OWNED BY public.habilidad_profesional.habprof_id;
            public       postgres    false    219            �            1259    33588    idioma    TABLE     �   CREATE TABLE public.idioma (
    idioma_id integer NOT NULL,
    idioma_nombre text,
    perfilusu_id integer
)
WITH (autovacuum_enabled='true');
    DROP TABLE public.idioma;
       public         postgres    false    3            �            1259    33594    idioma_idioma_id_seq    SEQUENCE     }   CREATE SEQUENCE public.idioma_idioma_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.idioma_idioma_id_seq;
       public       postgres    false    220    3            �           0    0    idioma_idioma_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.idioma_idioma_id_seq OWNED BY public.idioma.idioma_id;
            public       postgres    false    221            �            1259    33596    lista_bloqueados    TABLE     �   CREATE TABLE public.lista_bloqueados (
    bloq_id integer NOT NULL,
    usuario_id_bloquea integer,
    usuario_id_bloqueado integer
)
WITH (autovacuum_enabled='true');
 $   DROP TABLE public.lista_bloqueados;
       public         postgres    false    3            �            1259    33599    lista_bloqueados_bloq_id_seq    SEQUENCE     �   CREATE SEQUENCE public.lista_bloqueados_bloq_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.lista_bloqueados_bloq_id_seq;
       public       postgres    false    3    222            �           0    0    lista_bloqueados_bloq_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.lista_bloqueados_bloq_id_seq OWNED BY public.lista_bloqueados.bloq_id;
            public       postgres    false    223            �            1259    33601    marketplace    TABLE       CREATE TABLE public.marketplace (
    venta_id integer NOT NULL,
    venta_nombre text,
    venta_detalle text,
    venta_precio double precision,
    venta_url text,
    venta_estado boolean,
    categ_id integer,
    usuario_id integer
)
WITH (autovacuum_enabled='true');
    DROP TABLE public.marketplace;
       public         postgres    false    3            �            1259    33607    marketplace_venta_id_seq    SEQUENCE     �   CREATE SEQUENCE public.marketplace_venta_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.marketplace_venta_id_seq;
       public       postgres    false    3    224            �           0    0    marketplace_venta_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.marketplace_venta_id_seq OWNED BY public.marketplace.venta_id;
            public       postgres    false    225            �            1259    33609    mensajes    TABLE     �   CREATE TABLE public.mensajes (
    mensaje_id integer NOT NULL,
    mensaje_contenido text,
    mensaje_fecha_hora timestamp without time zone,
    mensaje_estaleido boolean,
    chat_id integer,
    usuario_id integer
)
WITH (autovacuum_enabled='true');
    DROP TABLE public.mensajes;
       public         postgres    false    3            �            1259    33615    mensajes_mensaje_id_seq    SEQUENCE     �   CREATE SEQUENCE public.mensajes_mensaje_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.mensajes_mensaje_id_seq;
       public       postgres    false    3    226            �           0    0    mensajes_mensaje_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.mensajes_mensaje_id_seq OWNED BY public.mensajes.mensaje_id;
            public       postgres    false    227            �            1259    33617    notificaciones    TABLE     2  CREATE TABLE public.notificaciones (
    notificacion_id integer NOT NULL,
    notificacion_fecha_hora timestamp without time zone,
    notificacion_tipo character varying(20),
    notificacion_leida boolean,
    usuario_id_emite integer,
    usuario_id_recepta integer
)
WITH (autovacuum_enabled='true');
 "   DROP TABLE public.notificaciones;
       public         postgres    false    3            �            1259    33620 "   notificaciones_notificacion_id_seq    SEQUENCE     �   CREATE SEQUENCE public.notificaciones_notificacion_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.notificaciones_notificacion_id_seq;
       public       postgres    false    3    228            �           0    0 "   notificaciones_notificacion_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.notificaciones_notificacion_id_seq OWNED BY public.notificaciones.notificacion_id;
            public       postgres    false    229            �            1259    33622    pagina_owner    TABLE     �   CREATE TABLE public.pagina_owner (
    pag_ownerid integer NOT NULL,
    pagina_id integer NOT NULL,
    usuario_id integer NOT NULL,
    rol_usuario text
);
     DROP TABLE public.pagina_owner;
       public         postgres    false    3            �            1259    33628    pagina_owner_pag_ownerid_seq    SEQUENCE     �   CREATE SEQUENCE public.pagina_owner_pag_ownerid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.pagina_owner_pag_ownerid_seq;
       public       postgres    false    3    230            �           0    0    pagina_owner_pag_ownerid_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.pagina_owner_pag_ownerid_seq OWNED BY public.pagina_owner.pag_ownerid;
            public       postgres    false    231            �            1259    33630    pagina_owner_pagina_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pagina_owner_pagina_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.pagina_owner_pagina_id_seq;
       public       postgres    false    3    230            �           0    0    pagina_owner_pagina_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.pagina_owner_pagina_id_seq OWNED BY public.pagina_owner.pagina_id;
            public       postgres    false    232            �            1259    33632    pagina_owner_usuario_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pagina_owner_usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.pagina_owner_usuario_id_seq;
       public       postgres    false    3    230            �           0    0    pagina_owner_usuario_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.pagina_owner_usuario_id_seq OWNED BY public.pagina_owner.usuario_id;
            public       postgres    false    233            �            1259    33634    pagina_seguidores    TABLE     �   CREATE TABLE public.pagina_seguidores (
    pagina_id integer NOT NULL,
    usuario_id integer NOT NULL
)
WITH (autovacuum_enabled='true');
 %   DROP TABLE public.pagina_seguidores;
       public         postgres    false    3            �            1259    33637    paginas    TABLE       CREATE TABLE public.paginas (
    pagina_id integer NOT NULL,
    pagina_logo text,
    pagina_portada text,
    pagina_nombre text,
    pagina_categoria character varying(20),
    pagina_nombreusuario text,
    pagina_telefono text
)
WITH (autovacuum_enabled='true');
    DROP TABLE public.paginas;
       public         postgres    false    3            �            1259    33643    paginas_pagina_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.paginas_pagina_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.paginas_pagina_id_seq;
       public       postgres    false    235    3            �           0    0    paginas_pagina_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.paginas_pagina_id_seq OWNED BY public.paginas.pagina_id;
            public       postgres    false    236            �            1259    33645    pais    TABLE     r   CREATE TABLE public.pais (
    pais_id integer NOT NULL,
    pais_nombre text
)
WITH (autovacuum_enabled='true');
    DROP TABLE public.pais;
       public         postgres    false    3            �            1259    33651    pais_pais_id_seq    SEQUENCE     y   CREATE SEQUENCE public.pais_pais_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.pais_pais_id_seq;
       public       postgres    false    237    3            �           0    0    pais_pais_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.pais_pais_id_seq OWNED BY public.pais.pais_id;
            public       postgres    false    238            �            1259    33653    participantes    TABLE     e  CREATE TABLE public.participantes (
    participante_id integer NOT NULL,
    participante_es text,
    participante_tipo text,
    participante_estado boolean,
    chat_id integer,
    comentario_id integer,
    grupo_id integer,
    respcom_id integer,
    pub_id integer,
    usuario_id integer,
    evento_id integer
)
WITH (autovacuum_enabled='true');
 !   DROP TABLE public.participantes;
       public         postgres    false    3            �            1259    33659 !   participantes_participante_id_seq    SEQUENCE     �   CREATE SEQUENCE public.participantes_participante_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.participantes_participante_id_seq;
       public       postgres    false    239    3                        0    0 !   participantes_participante_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.participantes_participante_id_seq OWNED BY public.participantes.participante_id;
            public       postgres    false    240            �            1259    33661    perfil_usuario    TABLE       CREATE TABLE public.perfil_usuario (
    perfilusu_id integer NOT NULL,
    perfil_path_foto text,
    perfil_path_portada text,
    perfil_interes text,
    perfil_religion text,
    perfil_informacion text,
    usuario_id integer
)
WITH (autovacuum_enabled='true');
 "   DROP TABLE public.perfil_usuario;
       public         postgres    false    3            �            1259    33667    perfil_usuario_perfilusu_id_seq    SEQUENCE     �   CREATE SEQUENCE public.perfil_usuario_perfilusu_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.perfil_usuario_perfilusu_id_seq;
       public       postgres    false    241    3                       0    0    perfil_usuario_perfilusu_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.perfil_usuario_perfilusu_id_seq OWNED BY public.perfil_usuario.perfilusu_id;
            public       postgres    false    242            �            1259    33669    publicacion    TABLE     �  CREATE TABLE public.publicacion (
    pub_id integer NOT NULL,
    pub_texto character varying,
    "pub_pathMult" text,
    pub_fechahora timestamp without time zone NOT NULL,
    pub_tipo character varying,
    pub_duracion text,
    pub_estado boolean,
    usuario_id integer,
    perfilusu_id integer,
    grupo_id integer,
    pagina_id integer,
    evento_id integer
)
WITH (autovacuum_enabled='true');
    DROP TABLE public.publicacion;
       public         postgres    false    3            �            1259    33675    publicacion_pub_id_seq    SEQUENCE        CREATE SEQUENCE public.publicacion_pub_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.publicacion_pub_id_seq;
       public       postgres    false    243    3                       0    0    publicacion_pub_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.publicacion_pub_id_seq OWNED BY public.publicacion.pub_id;
            public       postgres    false    244            �            1259    33677 
   reacciones    TABLE     9  CREATE TABLE public.reacciones (
    reacc_id integer NOT NULL,
    reacc_descrip text,
    reacc_fecha_hora timestamp without time zone,
    reacc_tipo text,
    mensaje_id integer,
    pub_id integer,
    comentario_id integer,
    respcom_id integer,
    usuario_id integer
)
WITH (autovacuum_enabled='true');
    DROP TABLE public.reacciones;
       public         postgres    false    3            �            1259    33683    reacciones_reacc_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reacciones_reacc_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.reacciones_reacc_id_seq;
       public       postgres    false    3    245                       0    0    reacciones_reacc_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.reacciones_reacc_id_seq OWNED BY public.reacciones.reacc_id;
            public       postgres    false    246            �            1259    33685    registro_actividad    TABLE     �   CREATE TABLE public.registro_actividad (
    regact_id integer NOT NULL,
    regact_desc text,
    regact_link_act text,
    regact_link_user text,
    usuario_id integer
)
WITH (autovacuum_enabled='true');
 &   DROP TABLE public.registro_actividad;
       public         postgres    false    3            �            1259    33691     registro_actividad_regact_id_seq    SEQUENCE     �   CREATE SEQUENCE public.registro_actividad_regact_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.registro_actividad_regact_id_seq;
       public       postgres    false    3    247                       0    0     registro_actividad_regact_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.registro_actividad_regact_id_seq OWNED BY public.registro_actividad.regact_id;
            public       postgres    false    248            �            1259    33693    respuesta_comentarios    TABLE     �   CREATE TABLE public.respuesta_comentarios (
    respcom_id integer NOT NULL,
    respcom_contenido text,
    respcom_fecha_hora timestamp without time zone,
    comentario_id integer,
    usuario_id integer
)
WITH (autovacuum_enabled='true');
 )   DROP TABLE public.respuesta_comentarios;
       public         postgres    false    3            �            1259    33699 $   respuesta_comentarios_respcom_id_seq    SEQUENCE     �   CREATE SEQUENCE public.respuesta_comentarios_respcom_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.respuesta_comentarios_respcom_id_seq;
       public       postgres    false    3    249                       0    0 $   respuesta_comentarios_respcom_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.respuesta_comentarios_respcom_id_seq OWNED BY public.respuesta_comentarios.respcom_id;
            public       postgres    false    250            �            1259    33701    seguidos    TABLE     �   CREATE TABLE public.seguidos (
    seguido_id integer NOT NULL,
    seguido_tipo text,
    pagina_id integer,
    usuario_id_sigue integer,
    usuario_id integer
)
WITH (autovacuum_enabled='true');
    DROP TABLE public.seguidos;
       public         postgres    false    3            �            1259    33707    seguidos_seguido_id_seq    SEQUENCE     �   CREATE SEQUENCE public.seguidos_seguido_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.seguidos_seguido_id_seq;
       public       postgres    false    251    3                       0    0    seguidos_seguido_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.seguidos_seguido_id_seq OWNED BY public.seguidos.seguido_id;
            public       postgres    false    252            �            1259    33709    situacionsentimental    TABLE     �   CREATE TABLE public.situacionsentimental (
    sitsent_id integer NOT NULL,
    sitsent_estado boolean,
    sitsent_fecha date,
    perfilusu_id integer,
    perfilusu_id_pareja integer
)
WITH (autovacuum_enabled='true');
 (   DROP TABLE public.situacionsentimental;
       public         postgres    false    3            �            1259    33712 #   situacionsentimental_sitsent_id_seq    SEQUENCE     �   CREATE SEQUENCE public.situacionsentimental_sitsent_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.situacionsentimental_sitsent_id_seq;
       public       postgres    false    253    3                       0    0 #   situacionsentimental_sitsent_id_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.situacionsentimental_sitsent_id_seq OWNED BY public.situacionsentimental.sitsent_id;
            public       postgres    false    254            �            1259    33714    solic_amistad    TABLE     �   CREATE TABLE public.solic_amistad (
    solic_id integer NOT NULL,
    solic_estado boolean,
    usuario_id_recepta integer,
    usuario_id_envia integer
)
WITH (autovacuum_enabled='true');
 !   DROP TABLE public.solic_amistad;
       public         postgres    false    3                        1259    33717    solic_amistad_solic_id_seq    SEQUENCE     �   CREATE SEQUENCE public.solic_amistad_solic_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.solic_amistad_solic_id_seq;
       public       postgres    false    3    255                       0    0    solic_amistad_solic_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.solic_amistad_solic_id_seq OWNED BY public.solic_amistad.solic_id;
            public       postgres    false    256                       1259    33719    telefono    TABLE     �   CREATE TABLE public.telefono (
    telf_id integer NOT NULL,
    telf_numero text,
    perfilusu_id integer
)
WITH (autovacuum_enabled='true');
    DROP TABLE public.telefono;
       public         postgres    false    3                       1259    33725    telefono_telf_id_seq    SEQUENCE     }   CREATE SEQUENCE public.telefono_telf_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.telefono_telf_id_seq;
       public       postgres    false    3    257            	           0    0    telefono_telf_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.telefono_telf_id_seq OWNED BY public.telefono.telf_id;
            public       postgres    false    258                       1259    33727    universidad    TABLE       CREATE TABLE public.universidad (
    univ_id integer NOT NULL,
    univ_centroeduc text,
    univ_fechainicio date,
    univ_fechafin date,
    univ_detalle text,
    univ_especialidad text,
    univ_finalizada boolean,
    perfilusu_id integer
)
WITH (autovacuum_enabled='true');
    DROP TABLE public.universidad;
       public         postgres    false    3                       1259    33733    universidad_univ_id_seq    SEQUENCE     �   CREATE SEQUENCE public.universidad_univ_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.universidad_univ_id_seq;
       public       postgres    false    259    3            
           0    0    universidad_univ_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.universidad_univ_id_seq OWNED BY public.universidad.univ_id;
            public       postgres    false    260                       1259    33735    usuario    TABLE     �  CREATE TABLE public.usuario (
    usuario_id integer NOT NULL,
    usuario_nombres character varying,
    usuario_apellidos character varying,
    usuario_email character varying,
    usuario_password text,
    usuario_fechanac date,
    usuario_sexo character varying,
    usuario_acc_verify boolean,
    usuario_path_face character varying,
    usuario_activo boolean,
    usuario_conectado boolean
)
WITH (autovacuum_enabled='true');
    DROP TABLE public.usuario;
       public         postgres    false    3                       1259    33741    usuario_usuario_id_seq    SEQUENCE        CREATE SEQUENCE public.usuario_usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.usuario_usuario_id_seq;
       public       postgres    false    261    3                       0    0    usuario_usuario_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.usuario_usuario_id_seq OWNED BY public.usuario.usuario_id;
            public       postgres    false    262                       1259    33743    ventas_guardadas    TABLE     �   CREATE TABLE public.ventas_guardadas (
    vguard_id integer NOT NULL,
    venta_id integer,
    vguard_estado text,
    usuario_id integer
)
WITH (autovacuum_enabled='true');
 $   DROP TABLE public.ventas_guardadas;
       public         postgres    false    3                       1259    33749    ventas_guardadas_vguard_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ventas_guardadas_vguard_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.ventas_guardadas_vguard_id_seq;
       public       postgres    false    263    3                       0    0    ventas_guardadas_vguard_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.ventas_guardadas_vguard_id_seq OWNED BY public.ventas_guardadas.vguard_id;
            public       postgres    false    264            P           2604    33751    amigos amig_id    DEFAULT     p   ALTER TABLE ONLY public.amigos ALTER COLUMN amig_id SET DEFAULT nextval('public.amigos_amig_id_seq'::regclass);
 =   ALTER TABLE public.amigos ALTER COLUMN amig_id DROP DEFAULT;
       public       postgres    false    197    196            Q           2604    33752    apodos apodo_id    DEFAULT     r   ALTER TABLE ONLY public.apodos ALTER COLUMN apodo_id SET DEFAULT nextval('public.apodos_apodo_id_seq'::regclass);
 >   ALTER TABLE public.apodos ALTER COLUMN apodo_id DROP DEFAULT;
       public       postgres    false    199    198            R           2604    33753    categoria categ_id    DEFAULT     x   ALTER TABLE ONLY public.categoria ALTER COLUMN categ_id SET DEFAULT nextval('public.categoria_categ_id_seq'::regclass);
 A   ALTER TABLE public.categoria ALTER COLUMN categ_id DROP DEFAULT;
       public       postgres    false    201    200            S           2604    33754    chat chat_id    DEFAULT     l   ALTER TABLE ONLY public.chat ALTER COLUMN chat_id SET DEFAULT nextval('public.chat_chat_id_seq'::regclass);
 ;   ALTER TABLE public.chat ALTER COLUMN chat_id DROP DEFAULT;
       public       postgres    false    203    202            T           2604    33755    ciudad ciud_id    DEFAULT     p   ALTER TABLE ONLY public.ciudad ALTER COLUMN ciud_id SET DEFAULT nextval('public.ciudad_ciud_id_seq'::regclass);
 =   ALTER TABLE public.ciudad ALTER COLUMN ciud_id DROP DEFAULT;
       public       postgres    false    205    204            U           2604    33756    comentarios comentario_id    DEFAULT     �   ALTER TABLE ONLY public.comentarios ALTER COLUMN comentario_id SET DEFAULT nextval('public.comentarios_comentario_id_seq'::regclass);
 H   ALTER TABLE public.comentarios ALTER COLUMN comentario_id DROP DEFAULT;
       public       postgres    false    207    206            V           2604    33757    direccion dir_id    DEFAULT     t   ALTER TABLE ONLY public.direccion ALTER COLUMN dir_id SET DEFAULT nextval('public.direccion_dir_id_seq'::regclass);
 ?   ALTER TABLE public.direccion ALTER COLUMN dir_id DROP DEFAULT;
       public       postgres    false    209    208            W           2604    33758    empleo empleo_id    DEFAULT     t   ALTER TABLE ONLY public.empleo ALTER COLUMN empleo_id SET DEFAULT nextval('public.empleo_empleo_id_seq'::regclass);
 ?   ALTER TABLE public.empleo ALTER COLUMN empleo_id DROP DEFAULT;
       public       postgres    false    211    210            X           2604    33759    eventos evento_id    DEFAULT     v   ALTER TABLE ONLY public.eventos ALTER COLUMN evento_id SET DEFAULT nextval('public.eventos_evento_id_seq'::regclass);
 @   ALTER TABLE public.eventos ALTER COLUMN evento_id DROP DEFAULT;
       public       postgres    false    213    212            Y           2604    33760    familiares fam_id    DEFAULT     v   ALTER TABLE ONLY public.familiares ALTER COLUMN fam_id SET DEFAULT nextval('public.familiares_fam_id_seq'::regclass);
 @   ALTER TABLE public.familiares ALTER COLUMN fam_id DROP DEFAULT;
       public       postgres    false    215    214            Z           2604    33761    grupos grupo_id    DEFAULT     r   ALTER TABLE ONLY public.grupos ALTER COLUMN grupo_id SET DEFAULT nextval('public.grupos_grupo_id_seq'::regclass);
 >   ALTER TABLE public.grupos ALTER COLUMN grupo_id DROP DEFAULT;
       public       postgres    false    217    216            [           2604    33762     habilidad_profesional habprof_id    DEFAULT     �   ALTER TABLE ONLY public.habilidad_profesional ALTER COLUMN habprof_id SET DEFAULT nextval('public.habilidad_profesional_habprof_id_seq'::regclass);
 O   ALTER TABLE public.habilidad_profesional ALTER COLUMN habprof_id DROP DEFAULT;
       public       postgres    false    219    218            \           2604    33763    idioma idioma_id    DEFAULT     t   ALTER TABLE ONLY public.idioma ALTER COLUMN idioma_id SET DEFAULT nextval('public.idioma_idioma_id_seq'::regclass);
 ?   ALTER TABLE public.idioma ALTER COLUMN idioma_id DROP DEFAULT;
       public       postgres    false    221    220            ]           2604    33764    lista_bloqueados bloq_id    DEFAULT     �   ALTER TABLE ONLY public.lista_bloqueados ALTER COLUMN bloq_id SET DEFAULT nextval('public.lista_bloqueados_bloq_id_seq'::regclass);
 G   ALTER TABLE public.lista_bloqueados ALTER COLUMN bloq_id DROP DEFAULT;
       public       postgres    false    223    222            ^           2604    33765    marketplace venta_id    DEFAULT     |   ALTER TABLE ONLY public.marketplace ALTER COLUMN venta_id SET DEFAULT nextval('public.marketplace_venta_id_seq'::regclass);
 C   ALTER TABLE public.marketplace ALTER COLUMN venta_id DROP DEFAULT;
       public       postgres    false    225    224            _           2604    33766    mensajes mensaje_id    DEFAULT     z   ALTER TABLE ONLY public.mensajes ALTER COLUMN mensaje_id SET DEFAULT nextval('public.mensajes_mensaje_id_seq'::regclass);
 B   ALTER TABLE public.mensajes ALTER COLUMN mensaje_id DROP DEFAULT;
       public       postgres    false    227    226            `           2604    33767    notificaciones notificacion_id    DEFAULT     �   ALTER TABLE ONLY public.notificaciones ALTER COLUMN notificacion_id SET DEFAULT nextval('public.notificaciones_notificacion_id_seq'::regclass);
 M   ALTER TABLE public.notificaciones ALTER COLUMN notificacion_id DROP DEFAULT;
       public       postgres    false    229    228            a           2604    33768    pagina_owner pag_ownerid    DEFAULT     �   ALTER TABLE ONLY public.pagina_owner ALTER COLUMN pag_ownerid SET DEFAULT nextval('public.pagina_owner_pag_ownerid_seq'::regclass);
 G   ALTER TABLE public.pagina_owner ALTER COLUMN pag_ownerid DROP DEFAULT;
       public       postgres    false    231    230            b           2604    33769    pagina_owner pagina_id    DEFAULT     �   ALTER TABLE ONLY public.pagina_owner ALTER COLUMN pagina_id SET DEFAULT nextval('public.pagina_owner_pagina_id_seq'::regclass);
 E   ALTER TABLE public.pagina_owner ALTER COLUMN pagina_id DROP DEFAULT;
       public       postgres    false    232    230            c           2604    33770    pagina_owner usuario_id    DEFAULT     �   ALTER TABLE ONLY public.pagina_owner ALTER COLUMN usuario_id SET DEFAULT nextval('public.pagina_owner_usuario_id_seq'::regclass);
 F   ALTER TABLE public.pagina_owner ALTER COLUMN usuario_id DROP DEFAULT;
       public       postgres    false    233    230            d           2604    33771    paginas pagina_id    DEFAULT     v   ALTER TABLE ONLY public.paginas ALTER COLUMN pagina_id SET DEFAULT nextval('public.paginas_pagina_id_seq'::regclass);
 @   ALTER TABLE public.paginas ALTER COLUMN pagina_id DROP DEFAULT;
       public       postgres    false    236    235            e           2604    33772    pais pais_id    DEFAULT     l   ALTER TABLE ONLY public.pais ALTER COLUMN pais_id SET DEFAULT nextval('public.pais_pais_id_seq'::regclass);
 ;   ALTER TABLE public.pais ALTER COLUMN pais_id DROP DEFAULT;
       public       postgres    false    238    237            f           2604    33773    participantes participante_id    DEFAULT     �   ALTER TABLE ONLY public.participantes ALTER COLUMN participante_id SET DEFAULT nextval('public.participantes_participante_id_seq'::regclass);
 L   ALTER TABLE public.participantes ALTER COLUMN participante_id DROP DEFAULT;
       public       postgres    false    240    239            g           2604    33774    perfil_usuario perfilusu_id    DEFAULT     �   ALTER TABLE ONLY public.perfil_usuario ALTER COLUMN perfilusu_id SET DEFAULT nextval('public.perfil_usuario_perfilusu_id_seq'::regclass);
 J   ALTER TABLE public.perfil_usuario ALTER COLUMN perfilusu_id DROP DEFAULT;
       public       postgres    false    242    241            h           2604    33775    publicacion pub_id    DEFAULT     x   ALTER TABLE ONLY public.publicacion ALTER COLUMN pub_id SET DEFAULT nextval('public.publicacion_pub_id_seq'::regclass);
 A   ALTER TABLE public.publicacion ALTER COLUMN pub_id DROP DEFAULT;
       public       postgres    false    244    243            i           2604    33776    reacciones reacc_id    DEFAULT     z   ALTER TABLE ONLY public.reacciones ALTER COLUMN reacc_id SET DEFAULT nextval('public.reacciones_reacc_id_seq'::regclass);
 B   ALTER TABLE public.reacciones ALTER COLUMN reacc_id DROP DEFAULT;
       public       postgres    false    246    245            j           2604    33777    registro_actividad regact_id    DEFAULT     �   ALTER TABLE ONLY public.registro_actividad ALTER COLUMN regact_id SET DEFAULT nextval('public.registro_actividad_regact_id_seq'::regclass);
 K   ALTER TABLE public.registro_actividad ALTER COLUMN regact_id DROP DEFAULT;
       public       postgres    false    248    247            k           2604    33778     respuesta_comentarios respcom_id    DEFAULT     �   ALTER TABLE ONLY public.respuesta_comentarios ALTER COLUMN respcom_id SET DEFAULT nextval('public.respuesta_comentarios_respcom_id_seq'::regclass);
 O   ALTER TABLE public.respuesta_comentarios ALTER COLUMN respcom_id DROP DEFAULT;
       public       postgres    false    250    249            l           2604    33779    seguidos seguido_id    DEFAULT     z   ALTER TABLE ONLY public.seguidos ALTER COLUMN seguido_id SET DEFAULT nextval('public.seguidos_seguido_id_seq'::regclass);
 B   ALTER TABLE public.seguidos ALTER COLUMN seguido_id DROP DEFAULT;
       public       postgres    false    252    251            m           2604    33780    situacionsentimental sitsent_id    DEFAULT     �   ALTER TABLE ONLY public.situacionsentimental ALTER COLUMN sitsent_id SET DEFAULT nextval('public.situacionsentimental_sitsent_id_seq'::regclass);
 N   ALTER TABLE public.situacionsentimental ALTER COLUMN sitsent_id DROP DEFAULT;
       public       postgres    false    254    253            n           2604    33781    solic_amistad solic_id    DEFAULT     �   ALTER TABLE ONLY public.solic_amistad ALTER COLUMN solic_id SET DEFAULT nextval('public.solic_amistad_solic_id_seq'::regclass);
 E   ALTER TABLE public.solic_amistad ALTER COLUMN solic_id DROP DEFAULT;
       public       postgres    false    256    255            o           2604    33782    telefono telf_id    DEFAULT     t   ALTER TABLE ONLY public.telefono ALTER COLUMN telf_id SET DEFAULT nextval('public.telefono_telf_id_seq'::regclass);
 ?   ALTER TABLE public.telefono ALTER COLUMN telf_id DROP DEFAULT;
       public       postgres    false    258    257            p           2604    33783    universidad univ_id    DEFAULT     z   ALTER TABLE ONLY public.universidad ALTER COLUMN univ_id SET DEFAULT nextval('public.universidad_univ_id_seq'::regclass);
 B   ALTER TABLE public.universidad ALTER COLUMN univ_id DROP DEFAULT;
       public       postgres    false    260    259            q           2604    33784    usuario usuario_id    DEFAULT     x   ALTER TABLE ONLY public.usuario ALTER COLUMN usuario_id SET DEFAULT nextval('public.usuario_usuario_id_seq'::regclass);
 A   ALTER TABLE public.usuario ALTER COLUMN usuario_id DROP DEFAULT;
       public       postgres    false    262    261            r           2604    33785    ventas_guardadas vguard_id    DEFAULT     �   ALTER TABLE ONLY public.ventas_guardadas ALTER COLUMN vguard_id SET DEFAULT nextval('public.ventas_guardadas_vguard_id_seq'::regclass);
 I   ALTER TABLE public.ventas_guardadas ALTER COLUMN vguard_id DROP DEFAULT;
       public       postgres    false    264    263            �          0    33501    amigos 
   TABLE DATA               S   COPY public.amigos (amig_id, amig_fecha, usuario_id, usuario_id_amigo) FROM stdin;
    public       postgres    false    196   ��      �          0    33506    apodos 
   TABLE DATA               F   COPY public.apodos (apodo_id, apodo_nombre, perfilusu_id) FROM stdin;
    public       postgres    false    198   ��      �          0    33514 	   categoria 
   TABLE DATA               ;   COPY public.categoria (categ_id, categ_nombre) FROM stdin;
    public       postgres    false    200   ܵ      �          0    33522    chat 
   TABLE DATA               I   COPY public.chat (chat_id, chat_nombre, chat_fecha_creacion) FROM stdin;
    public       postgres    false    202   F�      �          0    33527    ciudad 
   TABLE DATA               ?   COPY public.ciudad (ciud_id, ciud_nombre, pais_id) FROM stdin;
    public       postgres    false    204   c�      �          0    33535    comentarios 
   TABLE DATA               u   COPY public.comentarios (comentario_id, comentario_contenido, comentario_fecha_hora, pub_id, usuario_id) FROM stdin;
    public       postgres    false    206   ��      �          0    33540 	   direccion 
   TABLE DATA               a   COPY public.direccion (dir_id, dir_detalle, dir_codigopostal, perfilusu_id, ciud_id) FROM stdin;
    public       postgres    false    208   ��      �          0    33548    empleo 
   TABLE DATA               �   COPY public.empleo (empleo_id, empleo_empresa, empleo_puesto, empleo_detalle, empleo_fechainicio, empleo_fechafin, perfilusu_id) FROM stdin;
    public       postgres    false    210   ڷ      �          0    33556    eventos 
   TABLE DATA               �   COPY public.eventos (evento_id, evento_logo, evento_portada, evento_tipo, evento_fecha_hora, evento_lugar, evento_nombre) FROM stdin;
    public       postgres    false    212   ��      �          0    33564 
   familiares 
   TABLE DATA               W   COPY public.familiares (fam_id, fam_relacion, usuario_id_, usuario_id_fam) FROM stdin;
    public       postgres    false    214   �      �          0    33572    grupos 
   TABLE DATA               Q   COPY public.grupos (grupo_id, grupo_logo, grupo_portada, grupo_tipo) FROM stdin;
    public       postgres    false    216   1�      �          0    33580    habilidad_profesional 
   TABLE DATA               Z   COPY public.habilidad_profesional (habprof_id, habprof_aptitud, perfilusu_id) FROM stdin;
    public       postgres    false    218   N�      �          0    33588    idioma 
   TABLE DATA               H   COPY public.idioma (idioma_id, idioma_nombre, perfilusu_id) FROM stdin;
    public       postgres    false    220   k�      �          0    33596    lista_bloqueados 
   TABLE DATA               ]   COPY public.lista_bloqueados (bloq_id, usuario_id_bloquea, usuario_id_bloqueado) FROM stdin;
    public       postgres    false    222   ��      �          0    33601    marketplace 
   TABLE DATA               �   COPY public.marketplace (venta_id, venta_nombre, venta_detalle, venta_precio, venta_url, venta_estado, categ_id, usuario_id) FROM stdin;
    public       postgres    false    224   ��      �          0    33609    mensajes 
   TABLE DATA               }   COPY public.mensajes (mensaje_id, mensaje_contenido, mensaje_fecha_hora, mensaje_estaleido, chat_id, usuario_id) FROM stdin;
    public       postgres    false    226   ¸      �          0    33617    notificaciones 
   TABLE DATA               �   COPY public.notificaciones (notificacion_id, notificacion_fecha_hora, notificacion_tipo, notificacion_leida, usuario_id_emite, usuario_id_recepta) FROM stdin;
    public       postgres    false    228   ��      �          0    33622    pagina_owner 
   TABLE DATA               W   COPY public.pagina_owner (pag_ownerid, pagina_id, usuario_id, rol_usuario) FROM stdin;
    public       postgres    false    230   �      �          0    33634    pagina_seguidores 
   TABLE DATA               B   COPY public.pagina_seguidores (pagina_id, usuario_id) FROM stdin;
    public       postgres    false    234   8�      �          0    33637    paginas 
   TABLE DATA               �   COPY public.paginas (pagina_id, pagina_logo, pagina_portada, pagina_nombre, pagina_categoria, pagina_nombreusuario, pagina_telefono) FROM stdin;
    public       postgres    false    235   U�      �          0    33645    pais 
   TABLE DATA               4   COPY public.pais (pais_id, pais_nombre) FROM stdin;
    public       postgres    false    237   r�      �          0    33653    participantes 
   TABLE DATA               �   COPY public.participantes (participante_id, participante_es, participante_tipo, participante_estado, chat_id, comentario_id, grupo_id, respcom_id, pub_id, usuario_id, evento_id) FROM stdin;
    public       postgres    false    239   ��      �          0    33661    perfil_usuario 
   TABLE DATA               �   COPY public.perfil_usuario (perfilusu_id, perfil_path_foto, perfil_path_portada, perfil_interes, perfil_religion, perfil_informacion, usuario_id) FROM stdin;
    public       postgres    false    241   ��      �          0    33669    publicacion 
   TABLE DATA               �   COPY public.publicacion (pub_id, pub_texto, "pub_pathMult", pub_fechahora, pub_tipo, pub_duracion, pub_estado, usuario_id, perfilusu_id, grupo_id, pagina_id, evento_id) FROM stdin;
    public       postgres    false    243   ӹ      �          0    33677 
   reacciones 
   TABLE DATA               �   COPY public.reacciones (reacc_id, reacc_descrip, reacc_fecha_hora, reacc_tipo, mensaje_id, pub_id, comentario_id, respcom_id, usuario_id) FROM stdin;
    public       postgres    false    245   �      �          0    33685    registro_actividad 
   TABLE DATA               s   COPY public.registro_actividad (regact_id, regact_desc, regact_link_act, regact_link_user, usuario_id) FROM stdin;
    public       postgres    false    247   �      �          0    33693    respuesta_comentarios 
   TABLE DATA               }   COPY public.respuesta_comentarios (respcom_id, respcom_contenido, respcom_fecha_hora, comentario_id, usuario_id) FROM stdin;
    public       postgres    false    249   *�      �          0    33701    seguidos 
   TABLE DATA               e   COPY public.seguidos (seguido_id, seguido_tipo, pagina_id, usuario_id_sigue, usuario_id) FROM stdin;
    public       postgres    false    251   G�      �          0    33709    situacionsentimental 
   TABLE DATA               |   COPY public.situacionsentimental (sitsent_id, sitsent_estado, sitsent_fecha, perfilusu_id, perfilusu_id_pareja) FROM stdin;
    public       postgres    false    253   d�      �          0    33714    solic_amistad 
   TABLE DATA               e   COPY public.solic_amistad (solic_id, solic_estado, usuario_id_recepta, usuario_id_envia) FROM stdin;
    public       postgres    false    255   ��      �          0    33719    telefono 
   TABLE DATA               F   COPY public.telefono (telf_id, telf_numero, perfilusu_id) FROM stdin;
    public       postgres    false    257   ��      �          0    33727    universidad 
   TABLE DATA               �   COPY public.universidad (univ_id, univ_centroeduc, univ_fechainicio, univ_fechafin, univ_detalle, univ_especialidad, univ_finalizada, perfilusu_id) FROM stdin;
    public       postgres    false    259   ��      �          0    33735    usuario 
   TABLE DATA               �   COPY public.usuario (usuario_id, usuario_nombres, usuario_apellidos, usuario_email, usuario_password, usuario_fechanac, usuario_sexo, usuario_acc_verify, usuario_path_face, usuario_activo, usuario_conectado) FROM stdin;
    public       postgres    false    261   غ      �          0    33743    ventas_guardadas 
   TABLE DATA               Z   COPY public.ventas_guardadas (vguard_id, venta_id, vguard_estado, usuario_id) FROM stdin;
    public       postgres    false    263   ��                 0    0    amigos_amig_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.amigos_amig_id_seq', 1, false);
            public       postgres    false    197                       0    0    apodos_apodo_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.apodos_apodo_id_seq', 1, false);
            public       postgres    false    199                       0    0    categoria_categ_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.categoria_categ_id_seq', 7, true);
            public       postgres    false    201                       0    0    chat_chat_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.chat_chat_id_seq', 1, false);
            public       postgres    false    203                       0    0    ciudad_ciud_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.ciudad_ciud_id_seq', 1, false);
            public       postgres    false    205                       0    0    comentarios_comentario_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.comentarios_comentario_id_seq', 1, false);
            public       postgres    false    207                       0    0    direccion_dir_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.direccion_dir_id_seq', 1, false);
            public       postgres    false    209                       0    0    empleo_empleo_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.empleo_empleo_id_seq', 1, false);
            public       postgres    false    211                       0    0    eventos_evento_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.eventos_evento_id_seq', 1, false);
            public       postgres    false    213                       0    0    familiares_fam_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.familiares_fam_id_seq', 1, false);
            public       postgres    false    215                       0    0    grupos_grupo_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.grupos_grupo_id_seq', 1, false);
            public       postgres    false    217                       0    0 $   habilidad_profesional_habprof_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.habilidad_profesional_habprof_id_seq', 1, false);
            public       postgres    false    219                       0    0    idioma_idioma_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.idioma_idioma_id_seq', 1, false);
            public       postgres    false    221                       0    0    lista_bloqueados_bloq_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.lista_bloqueados_bloq_id_seq', 1, false);
            public       postgres    false    223                       0    0    marketplace_venta_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.marketplace_venta_id_seq', 1, false);
            public       postgres    false    225                       0    0    mensajes_mensaje_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.mensajes_mensaje_id_seq', 1, false);
            public       postgres    false    227                       0    0 "   notificaciones_notificacion_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.notificaciones_notificacion_id_seq', 1, false);
            public       postgres    false    229                       0    0    pagina_owner_pag_ownerid_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.pagina_owner_pag_ownerid_seq', 1, false);
            public       postgres    false    231                       0    0    pagina_owner_pagina_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.pagina_owner_pagina_id_seq', 1, false);
            public       postgres    false    232                        0    0    pagina_owner_usuario_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.pagina_owner_usuario_id_seq', 1, false);
            public       postgres    false    233            !           0    0    paginas_pagina_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.paginas_pagina_id_seq', 1, false);
            public       postgres    false    236            "           0    0    pais_pais_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.pais_pais_id_seq', 1, false);
            public       postgres    false    238            #           0    0 !   participantes_participante_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.participantes_participante_id_seq', 1, false);
            public       postgres    false    240            $           0    0    perfil_usuario_perfilusu_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.perfil_usuario_perfilusu_id_seq', 1, false);
            public       postgres    false    242            %           0    0    publicacion_pub_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.publicacion_pub_id_seq', 1, false);
            public       postgres    false    244            &           0    0    reacciones_reacc_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.reacciones_reacc_id_seq', 3, true);
            public       postgres    false    246            '           0    0     registro_actividad_regact_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.registro_actividad_regact_id_seq', 1, false);
            public       postgres    false    248            (           0    0 $   respuesta_comentarios_respcom_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.respuesta_comentarios_respcom_id_seq', 1, false);
            public       postgres    false    250            )           0    0    seguidos_seguido_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.seguidos_seguido_id_seq', 1, false);
            public       postgres    false    252            *           0    0 #   situacionsentimental_sitsent_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.situacionsentimental_sitsent_id_seq', 1, false);
            public       postgres    false    254            +           0    0    solic_amistad_solic_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.solic_amistad_solic_id_seq', 1, false);
            public       postgres    false    256            ,           0    0    telefono_telf_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.telefono_telf_id_seq', 1, false);
            public       postgres    false    258            -           0    0    universidad_univ_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.universidad_univ_id_seq', 1, false);
            public       postgres    false    260            .           0    0    usuario_usuario_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.usuario_usuario_id_seq', 1, false);
            public       postgres    false    262            /           0    0    ventas_guardadas_vguard_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.ventas_guardadas_vguard_id_seq', 1, false);
            public       postgres    false    264            v           2606    33787    amigos PK_amigos 
   CONSTRAINT     U   ALTER TABLE ONLY public.amigos
    ADD CONSTRAINT "PK_amigos" PRIMARY KEY (amig_id);
 <   ALTER TABLE ONLY public.amigos DROP CONSTRAINT "PK_amigos";
       public         postgres    false    196            y           2606    33789    apodos PK_apodos 
   CONSTRAINT     V   ALTER TABLE ONLY public.apodos
    ADD CONSTRAINT "PK_apodos" PRIMARY KEY (apodo_id);
 <   ALTER TABLE ONLY public.apodos DROP CONSTRAINT "PK_apodos";
       public         postgres    false    198            {           2606    33791    categoria PK_categoria 
   CONSTRAINT     \   ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT "PK_categoria" PRIMARY KEY (categ_id);
 B   ALTER TABLE ONLY public.categoria DROP CONSTRAINT "PK_categoria";
       public         postgres    false    200            }           2606    33793    chat PK_chat 
   CONSTRAINT     Q   ALTER TABLE ONLY public.chat
    ADD CONSTRAINT "PK_chat" PRIMARY KEY (chat_id);
 8   ALTER TABLE ONLY public.chat DROP CONSTRAINT "PK_chat";
       public         postgres    false    202            �           2606    33795    ciudad PK_ciudad 
   CONSTRAINT     U   ALTER TABLE ONLY public.ciudad
    ADD CONSTRAINT "PK_ciudad" PRIMARY KEY (ciud_id);
 <   ALTER TABLE ONLY public.ciudad DROP CONSTRAINT "PK_ciudad";
       public         postgres    false    204            �           2606    33797    comentarios PK_comentarios 
   CONSTRAINT     e   ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT "PK_comentarios" PRIMARY KEY (comentario_id);
 F   ALTER TABLE ONLY public.comentarios DROP CONSTRAINT "PK_comentarios";
       public         postgres    false    206            �           2606    33799    direccion PK_direccion 
   CONSTRAINT     Z   ALTER TABLE ONLY public.direccion
    ADD CONSTRAINT "PK_direccion" PRIMARY KEY (dir_id);
 B   ALTER TABLE ONLY public.direccion DROP CONSTRAINT "PK_direccion";
       public         postgres    false    208            �           2606    33801    empleo PK_empleo 
   CONSTRAINT     W   ALTER TABLE ONLY public.empleo
    ADD CONSTRAINT "PK_empleo" PRIMARY KEY (empleo_id);
 <   ALTER TABLE ONLY public.empleo DROP CONSTRAINT "PK_empleo";
       public         postgres    false    210            �           2606    33803    eventos PK_eventos 
   CONSTRAINT     Y   ALTER TABLE ONLY public.eventos
    ADD CONSTRAINT "PK_eventos" PRIMARY KEY (evento_id);
 >   ALTER TABLE ONLY public.eventos DROP CONSTRAINT "PK_eventos";
       public         postgres    false    212            �           2606    33805    familiares PK_familiares 
   CONSTRAINT     \   ALTER TABLE ONLY public.familiares
    ADD CONSTRAINT "PK_familiares" PRIMARY KEY (fam_id);
 D   ALTER TABLE ONLY public.familiares DROP CONSTRAINT "PK_familiares";
       public         postgres    false    214            �           2606    33807    grupos PK_grupos 
   CONSTRAINT     V   ALTER TABLE ONLY public.grupos
    ADD CONSTRAINT "PK_grupos" PRIMARY KEY (grupo_id);
 <   ALTER TABLE ONLY public.grupos DROP CONSTRAINT "PK_grupos";
       public         postgres    false    216            �           2606    33809 .   habilidad_profesional PK_habilidad_profesional 
   CONSTRAINT     v   ALTER TABLE ONLY public.habilidad_profesional
    ADD CONSTRAINT "PK_habilidad_profesional" PRIMARY KEY (habprof_id);
 Z   ALTER TABLE ONLY public.habilidad_profesional DROP CONSTRAINT "PK_habilidad_profesional";
       public         postgres    false    218            �           2606    33811    idioma PK_idioma 
   CONSTRAINT     W   ALTER TABLE ONLY public.idioma
    ADD CONSTRAINT "PK_idioma" PRIMARY KEY (idioma_id);
 <   ALTER TABLE ONLY public.idioma DROP CONSTRAINT "PK_idioma";
       public         postgres    false    220            �           2606    33813 $   lista_bloqueados PK_lista_bloqueados 
   CONSTRAINT     i   ALTER TABLE ONLY public.lista_bloqueados
    ADD CONSTRAINT "PK_lista_bloqueados" PRIMARY KEY (bloq_id);
 P   ALTER TABLE ONLY public.lista_bloqueados DROP CONSTRAINT "PK_lista_bloqueados";
       public         postgres    false    222            �           2606    33815    marketplace PK_marketplace 
   CONSTRAINT     `   ALTER TABLE ONLY public.marketplace
    ADD CONSTRAINT "PK_marketplace" PRIMARY KEY (venta_id);
 F   ALTER TABLE ONLY public.marketplace DROP CONSTRAINT "PK_marketplace";
       public         postgres    false    224            �           2606    33817    mensajes PK_mensajes 
   CONSTRAINT     \   ALTER TABLE ONLY public.mensajes
    ADD CONSTRAINT "PK_mensajes" PRIMARY KEY (mensaje_id);
 @   ALTER TABLE ONLY public.mensajes DROP CONSTRAINT "PK_mensajes";
       public         postgres    false    226            �           2606    33819     notificaciones PK_notificaciones 
   CONSTRAINT     m   ALTER TABLE ONLY public.notificaciones
    ADD CONSTRAINT "PK_notificaciones" PRIMARY KEY (notificacion_id);
 L   ALTER TABLE ONLY public.notificaciones DROP CONSTRAINT "PK_notificaciones";
       public         postgres    false    228            �           2606    33821 &   pagina_seguidores PK_pagina_seguidores 
   CONSTRAINT     y   ALTER TABLE ONLY public.pagina_seguidores
    ADD CONSTRAINT "PK_pagina_seguidores" PRIMARY KEY (pagina_id, usuario_id);
 R   ALTER TABLE ONLY public.pagina_seguidores DROP CONSTRAINT "PK_pagina_seguidores";
       public         postgres    false    234    234            �           2606    33823    paginas PK_paginas 
   CONSTRAINT     Y   ALTER TABLE ONLY public.paginas
    ADD CONSTRAINT "PK_paginas" PRIMARY KEY (pagina_id);
 >   ALTER TABLE ONLY public.paginas DROP CONSTRAINT "PK_paginas";
       public         postgres    false    235            �           2606    33825    pais PK_pais 
   CONSTRAINT     Q   ALTER TABLE ONLY public.pais
    ADD CONSTRAINT "PK_pais" PRIMARY KEY (pais_id);
 8   ALTER TABLE ONLY public.pais DROP CONSTRAINT "PK_pais";
       public         postgres    false    237            �           2606    33827    participantes PK_participantes 
   CONSTRAINT     k   ALTER TABLE ONLY public.participantes
    ADD CONSTRAINT "PK_participantes" PRIMARY KEY (participante_id);
 J   ALTER TABLE ONLY public.participantes DROP CONSTRAINT "PK_participantes";
       public         postgres    false    239            �           2606    33829     perfil_usuario PK_perfil_usuario 
   CONSTRAINT     j   ALTER TABLE ONLY public.perfil_usuario
    ADD CONSTRAINT "PK_perfil_usuario" PRIMARY KEY (perfilusu_id);
 L   ALTER TABLE ONLY public.perfil_usuario DROP CONSTRAINT "PK_perfil_usuario";
       public         postgres    false    241            �           2606    33831    publicacion PK_publicacion 
   CONSTRAINT     ^   ALTER TABLE ONLY public.publicacion
    ADD CONSTRAINT "PK_publicacion" PRIMARY KEY (pub_id);
 F   ALTER TABLE ONLY public.publicacion DROP CONSTRAINT "PK_publicacion";
       public         postgres    false    243            �           2606    33833    reacciones PK_reacciones 
   CONSTRAINT     ^   ALTER TABLE ONLY public.reacciones
    ADD CONSTRAINT "PK_reacciones" PRIMARY KEY (reacc_id);
 D   ALTER TABLE ONLY public.reacciones DROP CONSTRAINT "PK_reacciones";
       public         postgres    false    245            �           2606    33835 (   registro_actividad PK_registro_actividad 
   CONSTRAINT     o   ALTER TABLE ONLY public.registro_actividad
    ADD CONSTRAINT "PK_registro_actividad" PRIMARY KEY (regact_id);
 T   ALTER TABLE ONLY public.registro_actividad DROP CONSTRAINT "PK_registro_actividad";
       public         postgres    false    247            �           2606    33837 .   respuesta_comentarios PK_respuesta_comentarios 
   CONSTRAINT     v   ALTER TABLE ONLY public.respuesta_comentarios
    ADD CONSTRAINT "PK_respuesta_comentarios" PRIMARY KEY (respcom_id);
 Z   ALTER TABLE ONLY public.respuesta_comentarios DROP CONSTRAINT "PK_respuesta_comentarios";
       public         postgres    false    249            �           2606    33839    seguidos PK_seguidos 
   CONSTRAINT     \   ALTER TABLE ONLY public.seguidos
    ADD CONSTRAINT "PK_seguidos" PRIMARY KEY (seguido_id);
 @   ALTER TABLE ONLY public.seguidos DROP CONSTRAINT "PK_seguidos";
       public         postgres    false    251            �           2606    33841 ,   situacionsentimental PK_situacionsentimental 
   CONSTRAINT     t   ALTER TABLE ONLY public.situacionsentimental
    ADD CONSTRAINT "PK_situacionsentimental" PRIMARY KEY (sitsent_id);
 X   ALTER TABLE ONLY public.situacionsentimental DROP CONSTRAINT "PK_situacionsentimental";
       public         postgres    false    253            �           2606    33843    solic_amistad PK_solic_amistad 
   CONSTRAINT     d   ALTER TABLE ONLY public.solic_amistad
    ADD CONSTRAINT "PK_solic_amistad" PRIMARY KEY (solic_id);
 J   ALTER TABLE ONLY public.solic_amistad DROP CONSTRAINT "PK_solic_amistad";
       public         postgres    false    255            �           2606    33845    telefono PK_telefono 
   CONSTRAINT     Y   ALTER TABLE ONLY public.telefono
    ADD CONSTRAINT "PK_telefono" PRIMARY KEY (telf_id);
 @   ALTER TABLE ONLY public.telefono DROP CONSTRAINT "PK_telefono";
       public         postgres    false    257            �           2606    33847    universidad PK_universidad 
   CONSTRAINT     _   ALTER TABLE ONLY public.universidad
    ADD CONSTRAINT "PK_universidad" PRIMARY KEY (univ_id);
 F   ALTER TABLE ONLY public.universidad DROP CONSTRAINT "PK_universidad";
       public         postgres    false    259            �           2606    33849    usuario PK_usuario 
   CONSTRAINT     Z   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "PK_usuario" PRIMARY KEY (usuario_id);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "PK_usuario";
       public         postgres    false    261            �           2606    33851 $   ventas_guardadas PK_ventas_guardadas 
   CONSTRAINT     k   ALTER TABLE ONLY public.ventas_guardadas
    ADD CONSTRAINT "PK_ventas_guardadas" PRIMARY KEY (vguard_id);
 P   ALTER TABLE ONLY public.ventas_guardadas DROP CONSTRAINT "PK_ventas_guardadas";
       public         postgres    false    263            �           2606    33853    pagina_owner pk_pagowner 
   CONSTRAINT     _   ALTER TABLE ONLY public.pagina_owner
    ADD CONSTRAINT pk_pagowner PRIMARY KEY (pag_ownerid);
 B   ALTER TABLE ONLY public.pagina_owner DROP CONSTRAINT pk_pagowner;
       public         postgres    false    230            s           1259    33854    IX_Relationship1    INDEX     K   CREATE INDEX "IX_Relationship1" ON public.amigos USING btree (usuario_id);
 &   DROP INDEX public."IX_Relationship1";
       public         postgres    false    196            �           1259    33855    IX_Relationship14    INDEX     N   CREATE INDEX "IX_Relationship14" ON public.empleo USING btree (perfilusu_id);
 '   DROP INDEX public."IX_Relationship14";
       public         postgres    false    210            �           1259    33856    IX_Relationship15    INDEX     S   CREATE INDEX "IX_Relationship15" ON public.universidad USING btree (perfilusu_id);
 '   DROP INDEX public."IX_Relationship15";
       public         postgres    false    259            �           1259    33857    IX_Relationship16    INDEX     ]   CREATE INDEX "IX_Relationship16" ON public.habilidad_profesional USING btree (perfilusu_id);
 '   DROP INDEX public."IX_Relationship16";
       public         postgres    false    218            �           1259    33858    IX_Relationship17    INDEX     P   CREATE INDEX "IX_Relationship17" ON public.telefono USING btree (perfilusu_id);
 '   DROP INDEX public."IX_Relationship17";
       public         postgres    false    257            �           1259    33859    IX_Relationship18    INDEX     Q   CREATE INDEX "IX_Relationship18" ON public.direccion USING btree (perfilusu_id);
 '   DROP INDEX public."IX_Relationship18";
       public         postgres    false    208            �           1259    33860    IX_Relationship19    INDEX     N   CREATE INDEX "IX_Relationship19" ON public.idioma USING btree (perfilusu_id);
 '   DROP INDEX public."IX_Relationship19";
       public         postgres    false    220            t           1259    33861    IX_Relationship2    INDEX     Q   CREATE INDEX "IX_Relationship2" ON public.amigos USING btree (usuario_id_amigo);
 &   DROP INDEX public."IX_Relationship2";
       public         postgres    false    196            �           1259    33862    IX_Relationship20    INDEX     \   CREATE INDEX "IX_Relationship20" ON public.situacionsentimental USING btree (perfilusu_id);
 '   DROP INDEX public."IX_Relationship20";
       public         postgres    false    253            �           1259    33863    IX_Relationship21    INDEX     c   CREATE INDEX "IX_Relationship21" ON public.situacionsentimental USING btree (perfilusu_id_pareja);
 '   DROP INDEX public."IX_Relationship21";
       public         postgres    false    253            �           1259    33864    IX_Relationship22    INDEX     Q   CREATE INDEX "IX_Relationship22" ON public.familiares USING btree (usuario_id_);
 '   DROP INDEX public."IX_Relationship22";
       public         postgres    false    214            �           1259    33865    IX_Relationship23    INDEX     T   CREATE INDEX "IX_Relationship23" ON public.familiares USING btree (usuario_id_fam);
 '   DROP INDEX public."IX_Relationship23";
       public         postgres    false    214            �           1259    33866    IX_Relationship24    INDEX     L   CREATE INDEX "IX_Relationship24" ON public.direccion USING btree (ciud_id);
 '   DROP INDEX public."IX_Relationship24";
       public         postgres    false    208            �           1259    33867    IX_Relationship27    INDEX     X   CREATE INDEX "IX_Relationship27" ON public.registro_actividad USING btree (usuario_id);
 '   DROP INDEX public."IX_Relationship27";
       public         postgres    false    247            w           1259    33868    IX_Relationship28    INDEX     N   CREATE INDEX "IX_Relationship28" ON public.apodos USING btree (perfilusu_id);
 '   DROP INDEX public."IX_Relationship28";
       public         postgres    false    198            �           1259    33869    IX_Relationship29    INDEX     M   CREATE INDEX "IX_Relationship29" ON public.comentarios USING btree (pub_id);
 '   DROP INDEX public."IX_Relationship29";
       public         postgres    false    206            �           1259    33870    IX_Relationship3    INDEX     Z   CREATE INDEX "IX_Relationship3" ON public.solic_amistad USING btree (usuario_id_recepta);
 &   DROP INDEX public."IX_Relationship3";
       public         postgres    false    255            �           1259    33871    IX_Relationship36    INDEX     Q   CREATE INDEX "IX_Relationship36" ON public.comentarios USING btree (usuario_id);
 '   DROP INDEX public."IX_Relationship36";
       public         postgres    false    206            �           1259    33872    IX_Relationship37    INDEX     ^   CREATE INDEX "IX_Relationship37" ON public.respuesta_comentarios USING btree (comentario_id);
 '   DROP INDEX public."IX_Relationship37";
       public         postgres    false    249            �           1259    33873    IX_Relationship38    INDEX     [   CREATE INDEX "IX_Relationship38" ON public.respuesta_comentarios USING btree (usuario_id);
 '   DROP INDEX public."IX_Relationship38";
       public         postgres    false    249            �           1259    33874    IX_Relationship4    INDEX     X   CREATE INDEX "IX_Relationship4" ON public.solic_amistad USING btree (usuario_id_envia);
 &   DROP INDEX public."IX_Relationship4";
       public         postgres    false    255            �           1259    33875    IX_Relationship44    INDEX     P   CREATE INDEX "IX_Relationship44" ON public.reacciones USING btree (usuario_id);
 '   DROP INDEX public."IX_Relationship44";
       public         postgres    false    245            �           1259    33876    IX_Relationship5    INDEX     S   CREATE INDEX "IX_Relationship5" ON public.perfil_usuario USING btree (usuario_id);
 &   DROP INDEX public."IX_Relationship5";
       public         postgres    false    241            �           1259    33877    IX_Relationship53    INDEX     K   CREATE INDEX "IX_Relationship53" ON public.mensajes USING btree (chat_id);
 '   DROP INDEX public."IX_Relationship53";
       public         postgres    false    226            �           1259    33878    IX_Relationship6    INDEX     ]   CREATE INDEX "IX_Relationship6" ON public.lista_bloqueados USING btree (usuario_id_bloquea);
 &   DROP INDEX public."IX_Relationship6";
       public         postgres    false    222            �           1259    33879    IX_Relationship60    INDEX     Z   CREATE INDEX "IX_Relationship60" ON public.notificaciones USING btree (usuario_id_emite);
 '   DROP INDEX public."IX_Relationship60";
       public         postgres    false    228            �           1259    33880    IX_Relationship61    INDEX     \   CREATE INDEX "IX_Relationship61" ON public.notificaciones USING btree (usuario_id_recepta);
 '   DROP INDEX public."IX_Relationship61";
       public         postgres    false    228            �           1259    33881    IX_Relationship66    INDEX     S   CREATE INDEX "IX_Relationship66" ON public.publicacion USING btree (perfilusu_id);
 '   DROP INDEX public."IX_Relationship66";
       public         postgres    false    243            �           1259    33882    IX_Relationship67    INDEX     O   CREATE INDEX "IX_Relationship67" ON public.publicacion USING btree (grupo_id);
 '   DROP INDEX public."IX_Relationship67";
       public         postgres    false    243            �           1259    33883    IX_Relationship68    INDEX     P   CREATE INDEX "IX_Relationship68" ON public.publicacion USING btree (pagina_id);
 '   DROP INDEX public."IX_Relationship68";
       public         postgres    false    243            �           1259    33884    IX_Relationship69    INDEX     P   CREATE INDEX "IX_Relationship69" ON public.publicacion USING btree (evento_id);
 '   DROP INDEX public."IX_Relationship69";
       public         postgres    false    243            �           1259    33885    IX_Relationship7    INDEX     _   CREATE INDEX "IX_Relationship7" ON public.lista_bloqueados USING btree (usuario_id_bloqueado);
 &   DROP INDEX public."IX_Relationship7";
       public         postgres    false    222            �           1259    33886    IX_Relationship70    INDEX     M   CREATE INDEX "IX_Relationship70" ON public.seguidos USING btree (pagina_id);
 '   DROP INDEX public."IX_Relationship70";
       public         postgres    false    251            �           1259    33887    IX_Relationship71    INDEX     T   CREATE INDEX "IX_Relationship71" ON public.seguidos USING btree (usuario_id_sigue);
 '   DROP INDEX public."IX_Relationship71";
       public         postgres    false    251            �           1259    33888    IX_Relationship72    INDEX     N   CREATE INDEX "IX_Relationship72" ON public.seguidos USING btree (usuario_id);
 '   DROP INDEX public."IX_Relationship72";
       public         postgres    false    251            �           1259    33889    IX_Relationship73    INDEX     S   CREATE INDEX "IX_Relationship73" ON public.participantes USING btree (usuario_id);
 '   DROP INDEX public."IX_Relationship73";
       public         postgres    false    239            �           1259    33890    IX_Relationship74    INDEX     P   CREATE INDEX "IX_Relationship74" ON public.participantes USING btree (chat_id);
 '   DROP INDEX public."IX_Relationship74";
       public         postgres    false    239            �           1259    33891    IX_Relationship75    INDEX     V   CREATE INDEX "IX_Relationship75" ON public.participantes USING btree (comentario_id);
 '   DROP INDEX public."IX_Relationship75";
       public         postgres    false    239            �           1259    33892    IX_Relationship76    INDEX     Q   CREATE INDEX "IX_Relationship76" ON public.participantes USING btree (grupo_id);
 '   DROP INDEX public."IX_Relationship76";
       public         postgres    false    239            �           1259    33893    IX_Relationship77    INDEX     S   CREATE INDEX "IX_Relationship77" ON public.participantes USING btree (respcom_id);
 '   DROP INDEX public."IX_Relationship77";
       public         postgres    false    239            �           1259    33894    IX_Relationship78    INDEX     O   CREATE INDEX "IX_Relationship78" ON public.participantes USING btree (pub_id);
 '   DROP INDEX public."IX_Relationship78";
       public         postgres    false    239            �           1259    33895    IX_Relationship79    INDEX     R   CREATE INDEX "IX_Relationship79" ON public.participantes USING btree (evento_id);
 '   DROP INDEX public."IX_Relationship79";
       public         postgres    false    239            ~           1259    33896    IX_Relationship8    INDEX     H   CREATE INDEX "IX_Relationship8" ON public.ciudad USING btree (pais_id);
 &   DROP INDEX public."IX_Relationship8";
       public         postgres    false    204            �           1259    33897    IX_Relationship80    INDEX     N   CREATE INDEX "IX_Relationship80" ON public.mensajes USING btree (usuario_id);
 '   DROP INDEX public."IX_Relationship80";
       public         postgres    false    226            �           1259    33898    IX_Relationship81    INDEX     P   CREATE INDEX "IX_Relationship81" ON public.reacciones USING btree (mensaje_id);
 '   DROP INDEX public."IX_Relationship81";
       public         postgres    false    245            �           1259    33899    IX_Relationship82    INDEX     L   CREATE INDEX "IX_Relationship82" ON public.reacciones USING btree (pub_id);
 '   DROP INDEX public."IX_Relationship82";
       public         postgres    false    245            �           1259    33900    IX_Relationship83    INDEX     S   CREATE INDEX "IX_Relationship83" ON public.reacciones USING btree (comentario_id);
 '   DROP INDEX public."IX_Relationship83";
       public         postgres    false    245            �           1259    33901    IX_Relationship84    INDEX     P   CREATE INDEX "IX_Relationship84" ON public.reacciones USING btree (respcom_id);
 '   DROP INDEX public."IX_Relationship84";
       public         postgres    false    245            �           1259    33902    IX_Relationship85    INDEX     T   CREATE INDEX "IX_Relationship85" ON public.ventas_guardadas USING btree (venta_id);
 '   DROP INDEX public."IX_Relationship85";
       public         postgres    false    263            �           1259    33903    IX_Relationship86    INDEX     O   CREATE INDEX "IX_Relationship86" ON public.marketplace USING btree (categ_id);
 '   DROP INDEX public."IX_Relationship86";
       public         postgres    false    224            �           1259    33904    IX_Relationship87    INDEX     Q   CREATE INDEX "IX_Relationship87" ON public.marketplace USING btree (usuario_id);
 '   DROP INDEX public."IX_Relationship87";
       public         postgres    false    224            �           1259    33905    IX_Relationship9    INDEX     P   CREATE INDEX "IX_Relationship9" ON public.publicacion USING btree (usuario_id);
 &   DROP INDEX public."IX_Relationship9";
       public         postgres    false    243            #           2606    34187 -   ventas_guardadas FK_venta_guardada_usuario_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.ventas_guardadas
    ADD CONSTRAINT "FK_venta_guardada_usuario_id" FOREIGN KEY (vguard_id) REFERENCES public.usuario(usuario_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;
 Y   ALTER TABLE ONLY public.ventas_guardadas DROP CONSTRAINT "FK_venta_guardada_usuario_id";
       public       postgres    false    263    261    3047            �           2606    33906    amigos Relationship1    FK CONSTRAINT     �   ALTER TABLE ONLY public.amigos
    ADD CONSTRAINT "Relationship1" FOREIGN KEY (usuario_id) REFERENCES public.usuario(usuario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 @   ALTER TABLE ONLY public.amigos DROP CONSTRAINT "Relationship1";
       public       postgres    false    3047    196    261            �           2606    33911    empleo Relationship14    FK CONSTRAINT     �   ALTER TABLE ONLY public.empleo
    ADD CONSTRAINT "Relationship14" FOREIGN KEY (perfilusu_id) REFERENCES public.perfil_usuario(perfilusu_id) ON UPDATE CASCADE ON DELETE CASCADE;
 A   ALTER TABLE ONLY public.empleo DROP CONSTRAINT "Relationship14";
       public       postgres    false    3005    210    241            !           2606    33916    universidad Relationship15    FK CONSTRAINT     �   ALTER TABLE ONLY public.universidad
    ADD CONSTRAINT "Relationship15" FOREIGN KEY (perfilusu_id) REFERENCES public.perfil_usuario(perfilusu_id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.universidad DROP CONSTRAINT "Relationship15";
       public       postgres    false    3005    259    241            �           2606    33921 $   habilidad_profesional Relationship16    FK CONSTRAINT     �   ALTER TABLE ONLY public.habilidad_profesional
    ADD CONSTRAINT "Relationship16" FOREIGN KEY (perfilusu_id) REFERENCES public.perfil_usuario(perfilusu_id) ON UPDATE CASCADE ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.habilidad_profesional DROP CONSTRAINT "Relationship16";
       public       postgres    false    218    3005    241                        2606    33926    telefono Relationship17    FK CONSTRAINT     �   ALTER TABLE ONLY public.telefono
    ADD CONSTRAINT "Relationship17" FOREIGN KEY (perfilusu_id) REFERENCES public.perfil_usuario(perfilusu_id) ON UPDATE CASCADE ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.telefono DROP CONSTRAINT "Relationship17";
       public       postgres    false    3005    241    257            �           2606    33931    direccion Relationship18    FK CONSTRAINT     �   ALTER TABLE ONLY public.direccion
    ADD CONSTRAINT "Relationship18" FOREIGN KEY (perfilusu_id) REFERENCES public.perfil_usuario(perfilusu_id) ON UPDATE CASCADE ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.direccion DROP CONSTRAINT "Relationship18";
       public       postgres    false    208    3005    241            �           2606    33936    idioma Relationship19    FK CONSTRAINT     �   ALTER TABLE ONLY public.idioma
    ADD CONSTRAINT "Relationship19" FOREIGN KEY (perfilusu_id) REFERENCES public.perfil_usuario(perfilusu_id) ON UPDATE CASCADE ON DELETE CASCADE;
 A   ALTER TABLE ONLY public.idioma DROP CONSTRAINT "Relationship19";
       public       postgres    false    3005    220    241            �           2606    33941    amigos Relationship2    FK CONSTRAINT     �   ALTER TABLE ONLY public.amigos
    ADD CONSTRAINT "Relationship2" FOREIGN KEY (usuario_id_amigo) REFERENCES public.usuario(usuario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 @   ALTER TABLE ONLY public.amigos DROP CONSTRAINT "Relationship2";
       public       postgres    false    196    3047    261                       2606    33946 #   situacionsentimental Relationship20    FK CONSTRAINT     �   ALTER TABLE ONLY public.situacionsentimental
    ADD CONSTRAINT "Relationship20" FOREIGN KEY (perfilusu_id) REFERENCES public.perfil_usuario(perfilusu_id) ON UPDATE CASCADE ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.situacionsentimental DROP CONSTRAINT "Relationship20";
       public       postgres    false    241    253    3005                       2606    33951 #   situacionsentimental Relationship21    FK CONSTRAINT     �   ALTER TABLE ONLY public.situacionsentimental
    ADD CONSTRAINT "Relationship21" FOREIGN KEY (perfilusu_id_pareja) REFERENCES public.perfil_usuario(perfilusu_id) ON UPDATE CASCADE ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.situacionsentimental DROP CONSTRAINT "Relationship21";
       public       postgres    false    3005    253    241            �           2606    33956    familiares Relationship22    FK CONSTRAINT     �   ALTER TABLE ONLY public.familiares
    ADD CONSTRAINT "Relationship22" FOREIGN KEY (usuario_id_) REFERENCES public.usuario(usuario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.familiares DROP CONSTRAINT "Relationship22";
       public       postgres    false    214    3047    261            �           2606    33961    familiares Relationship23    FK CONSTRAINT     �   ALTER TABLE ONLY public.familiares
    ADD CONSTRAINT "Relationship23" FOREIGN KEY (usuario_id_fam) REFERENCES public.usuario(usuario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.familiares DROP CONSTRAINT "Relationship23";
       public       postgres    false    3047    214    261            �           2606    33966    direccion Relationship24    FK CONSTRAINT     �   ALTER TABLE ONLY public.direccion
    ADD CONSTRAINT "Relationship24" FOREIGN KEY (ciud_id) REFERENCES public.ciudad(ciud_id) ON UPDATE CASCADE ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.direccion DROP CONSTRAINT "Relationship24";
       public       postgres    false    2944    204    208                       2606    33971 !   registro_actividad Relationship27    FK CONSTRAINT     �   ALTER TABLE ONLY public.registro_actividad
    ADD CONSTRAINT "Relationship27" FOREIGN KEY (usuario_id) REFERENCES public.usuario(usuario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 M   ALTER TABLE ONLY public.registro_actividad DROP CONSTRAINT "Relationship27";
       public       postgres    false    3047    261    247            �           2606    33976    apodos Relationship28    FK CONSTRAINT     �   ALTER TABLE ONLY public.apodos
    ADD CONSTRAINT "Relationship28" FOREIGN KEY (perfilusu_id) REFERENCES public.perfil_usuario(perfilusu_id) ON UPDATE CASCADE ON DELETE CASCADE;
 A   ALTER TABLE ONLY public.apodos DROP CONSTRAINT "Relationship28";
       public       postgres    false    3005    241    198            �           2606    33981    comentarios Relationship29    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT "Relationship29" FOREIGN KEY (pub_id) REFERENCES public.publicacion(pub_id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.comentarios DROP CONSTRAINT "Relationship29";
       public       postgres    false    3012    206    243                       2606    33986    solic_amistad Relationship3    FK CONSTRAINT     �   ALTER TABLE ONLY public.solic_amistad
    ADD CONSTRAINT "Relationship3" FOREIGN KEY (usuario_id_recepta) REFERENCES public.usuario(usuario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.solic_amistad DROP CONSTRAINT "Relationship3";
       public       postgres    false    261    255    3047            �           2606    33991    comentarios Relationship36    FK CONSTRAINT     �   ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT "Relationship36" FOREIGN KEY (usuario_id) REFERENCES public.usuario(usuario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.comentarios DROP CONSTRAINT "Relationship36";
       public       postgres    false    206    261    3047                       2606    33996 $   respuesta_comentarios Relationship37    FK CONSTRAINT     �   ALTER TABLE ONLY public.respuesta_comentarios
    ADD CONSTRAINT "Relationship37" FOREIGN KEY (comentario_id) REFERENCES public.comentarios(comentario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.respuesta_comentarios DROP CONSTRAINT "Relationship37";
       public       postgres    false    2948    249    206                       2606    34001 $   respuesta_comentarios Relationship38    FK CONSTRAINT     �   ALTER TABLE ONLY public.respuesta_comentarios
    ADD CONSTRAINT "Relationship38" FOREIGN KEY (usuario_id) REFERENCES public.usuario(usuario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.respuesta_comentarios DROP CONSTRAINT "Relationship38";
       public       postgres    false    261    3047    249                       2606    34006    solic_amistad Relationship4    FK CONSTRAINT     �   ALTER TABLE ONLY public.solic_amistad
    ADD CONSTRAINT "Relationship4" FOREIGN KEY (usuario_id_envia) REFERENCES public.usuario(usuario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.solic_amistad DROP CONSTRAINT "Relationship4";
       public       postgres    false    3047    261    255                       2606    34011    reacciones Relationship44    FK CONSTRAINT     �   ALTER TABLE ONLY public.reacciones
    ADD CONSTRAINT "Relationship44" FOREIGN KEY (usuario_id) REFERENCES public.usuario(usuario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.reacciones DROP CONSTRAINT "Relationship44";
       public       postgres    false    245    261    3047                       2606    34016    perfil_usuario Relationship5    FK CONSTRAINT     �   ALTER TABLE ONLY public.perfil_usuario
    ADD CONSTRAINT "Relationship5" FOREIGN KEY (usuario_id) REFERENCES public.usuario(usuario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.perfil_usuario DROP CONSTRAINT "Relationship5";
       public       postgres    false    261    3047    241            �           2606    34021    mensajes Relationship53    FK CONSTRAINT     �   ALTER TABLE ONLY public.mensajes
    ADD CONSTRAINT "Relationship53" FOREIGN KEY (chat_id) REFERENCES public.chat(chat_id) ON UPDATE CASCADE ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.mensajes DROP CONSTRAINT "Relationship53";
       public       postgres    false    226    2941    202            �           2606    34026    lista_bloqueados Relationship6    FK CONSTRAINT     �   ALTER TABLE ONLY public.lista_bloqueados
    ADD CONSTRAINT "Relationship6" FOREIGN KEY (usuario_id_bloquea) REFERENCES public.usuario(usuario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.lista_bloqueados DROP CONSTRAINT "Relationship6";
       public       postgres    false    222    3047    261            �           2606    34031    notificaciones Relationship60    FK CONSTRAINT     �   ALTER TABLE ONLY public.notificaciones
    ADD CONSTRAINT "Relationship60" FOREIGN KEY (usuario_id_emite) REFERENCES public.usuario(usuario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.notificaciones DROP CONSTRAINT "Relationship60";
       public       postgres    false    3047    261    228            �           2606    34036    notificaciones Relationship61    FK CONSTRAINT     �   ALTER TABLE ONLY public.notificaciones
    ADD CONSTRAINT "Relationship61" FOREIGN KEY (usuario_id_recepta) REFERENCES public.usuario(usuario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.notificaciones DROP CONSTRAINT "Relationship61";
       public       postgres    false    228    3047    261                       2606    34041     pagina_seguidores Relationship64    FK CONSTRAINT     �   ALTER TABLE ONLY public.pagina_seguidores
    ADD CONSTRAINT "Relationship64" FOREIGN KEY (pagina_id) REFERENCES public.paginas(pagina_id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.pagina_seguidores DROP CONSTRAINT "Relationship64";
       public       postgres    false    235    2991    234                       2606    34046     pagina_seguidores Relationship65    FK CONSTRAINT     �   ALTER TABLE ONLY public.pagina_seguidores
    ADD CONSTRAINT "Relationship65" FOREIGN KEY (usuario_id) REFERENCES public.usuario(usuario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.pagina_seguidores DROP CONSTRAINT "Relationship65";
       public       postgres    false    261    234    3047                       2606    34051    publicacion Relationship66    FK CONSTRAINT     �   ALTER TABLE ONLY public.publicacion
    ADD CONSTRAINT "Relationship66" FOREIGN KEY (perfilusu_id) REFERENCES public.perfil_usuario(perfilusu_id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.publicacion DROP CONSTRAINT "Relationship66";
       public       postgres    false    241    3005    243                       2606    34056    publicacion Relationship67    FK CONSTRAINT     �   ALTER TABLE ONLY public.publicacion
    ADD CONSTRAINT "Relationship67" FOREIGN KEY (grupo_id) REFERENCES public.grupos(grupo_id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.publicacion DROP CONSTRAINT "Relationship67";
       public       postgres    false    243    216    2963                       2606    34061    publicacion Relationship68    FK CONSTRAINT     �   ALTER TABLE ONLY public.publicacion
    ADD CONSTRAINT "Relationship68" FOREIGN KEY (pagina_id) REFERENCES public.paginas(pagina_id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.publicacion DROP CONSTRAINT "Relationship68";
       public       postgres    false    2991    243    235                       2606    34066    publicacion Relationship69    FK CONSTRAINT     �   ALTER TABLE ONLY public.publicacion
    ADD CONSTRAINT "Relationship69" FOREIGN KEY (evento_id) REFERENCES public.eventos(evento_id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.publicacion DROP CONSTRAINT "Relationship69";
       public       postgres    false    212    243    2957            �           2606    34071    lista_bloqueados Relationship7    FK CONSTRAINT     �   ALTER TABLE ONLY public.lista_bloqueados
    ADD CONSTRAINT "Relationship7" FOREIGN KEY (usuario_id_bloqueado) REFERENCES public.usuario(usuario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.lista_bloqueados DROP CONSTRAINT "Relationship7";
       public       postgres    false    261    222    3047                       2606    34076    seguidos Relationship70    FK CONSTRAINT     �   ALTER TABLE ONLY public.seguidos
    ADD CONSTRAINT "Relationship70" FOREIGN KEY (pagina_id) REFERENCES public.paginas(pagina_id) ON UPDATE CASCADE ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.seguidos DROP CONSTRAINT "Relationship70";
       public       postgres    false    235    251    2991                       2606    34081    seguidos Relationship71    FK CONSTRAINT     �   ALTER TABLE ONLY public.seguidos
    ADD CONSTRAINT "Relationship71" FOREIGN KEY (usuario_id_sigue) REFERENCES public.usuario(usuario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.seguidos DROP CONSTRAINT "Relationship71";
       public       postgres    false    261    3047    251                       2606    34086    seguidos Relationship72    FK CONSTRAINT     �   ALTER TABLE ONLY public.seguidos
    ADD CONSTRAINT "Relationship72" FOREIGN KEY (usuario_id) REFERENCES public.usuario(usuario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.seguidos DROP CONSTRAINT "Relationship72";
       public       postgres    false    3047    261    251                       2606    34091    participantes Relationship73    FK CONSTRAINT     �   ALTER TABLE ONLY public.participantes
    ADD CONSTRAINT "Relationship73" FOREIGN KEY (usuario_id) REFERENCES public.usuario(usuario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.participantes DROP CONSTRAINT "Relationship73";
       public       postgres    false    261    239    3047                       2606    34096    participantes Relationship74    FK CONSTRAINT     �   ALTER TABLE ONLY public.participantes
    ADD CONSTRAINT "Relationship74" FOREIGN KEY (chat_id) REFERENCES public.chat(chat_id) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.participantes DROP CONSTRAINT "Relationship74";
       public       postgres    false    2941    239    202                       2606    34101    participantes Relationship75    FK CONSTRAINT     �   ALTER TABLE ONLY public.participantes
    ADD CONSTRAINT "Relationship75" FOREIGN KEY (comentario_id) REFERENCES public.comentarios(comentario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.participantes DROP CONSTRAINT "Relationship75";
       public       postgres    false    206    239    2948                       2606    34106    participantes Relationship76    FK CONSTRAINT     �   ALTER TABLE ONLY public.participantes
    ADD CONSTRAINT "Relationship76" FOREIGN KEY (grupo_id) REFERENCES public.grupos(grupo_id) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.participantes DROP CONSTRAINT "Relationship76";
       public       postgres    false    239    216    2963                       2606    34111    participantes Relationship77    FK CONSTRAINT     �   ALTER TABLE ONLY public.participantes
    ADD CONSTRAINT "Relationship77" FOREIGN KEY (respcom_id) REFERENCES public.respuesta_comentarios(respcom_id) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.participantes DROP CONSTRAINT "Relationship77";
       public       postgres    false    3026    239    249            	           2606    34116    participantes Relationship78    FK CONSTRAINT     �   ALTER TABLE ONLY public.participantes
    ADD CONSTRAINT "Relationship78" FOREIGN KEY (pub_id) REFERENCES public.publicacion(pub_id) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.participantes DROP CONSTRAINT "Relationship78";
       public       postgres    false    3012    243    239            
           2606    34121    participantes Relationship79    FK CONSTRAINT     �   ALTER TABLE ONLY public.participantes
    ADD CONSTRAINT "Relationship79" FOREIGN KEY (evento_id) REFERENCES public.eventos(evento_id) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.participantes DROP CONSTRAINT "Relationship79";
       public       postgres    false    239    2957    212            �           2606    34126    ciudad Relationship8    FK CONSTRAINT     �   ALTER TABLE ONLY public.ciudad
    ADD CONSTRAINT "Relationship8" FOREIGN KEY (pais_id) REFERENCES public.pais(pais_id) ON UPDATE CASCADE ON DELETE CASCADE;
 @   ALTER TABLE ONLY public.ciudad DROP CONSTRAINT "Relationship8";
       public       postgres    false    2993    204    237            �           2606    34131    mensajes Relationship80    FK CONSTRAINT     �   ALTER TABLE ONLY public.mensajes
    ADD CONSTRAINT "Relationship80" FOREIGN KEY (usuario_id) REFERENCES public.usuario(usuario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.mensajes DROP CONSTRAINT "Relationship80";
       public       postgres    false    226    261    3047                       2606    34136    reacciones Relationship81    FK CONSTRAINT     �   ALTER TABLE ONLY public.reacciones
    ADD CONSTRAINT "Relationship81" FOREIGN KEY (mensaje_id) REFERENCES public.mensajes(mensaje_id) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.reacciones DROP CONSTRAINT "Relationship81";
       public       postgres    false    2981    226    245                       2606    34141    reacciones Relationship82    FK CONSTRAINT     �   ALTER TABLE ONLY public.reacciones
    ADD CONSTRAINT "Relationship82" FOREIGN KEY (pub_id) REFERENCES public.publicacion(pub_id) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.reacciones DROP CONSTRAINT "Relationship82";
       public       postgres    false    245    243    3012                       2606    34146    reacciones Relationship83    FK CONSTRAINT     �   ALTER TABLE ONLY public.reacciones
    ADD CONSTRAINT "Relationship83" FOREIGN KEY (comentario_id) REFERENCES public.comentarios(comentario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.reacciones DROP CONSTRAINT "Relationship83";
       public       postgres    false    245    2948    206                       2606    34151    reacciones Relationship84    FK CONSTRAINT     �   ALTER TABLE ONLY public.reacciones
    ADD CONSTRAINT "Relationship84" FOREIGN KEY (respcom_id) REFERENCES public.respuesta_comentarios(respcom_id) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.reacciones DROP CONSTRAINT "Relationship84";
       public       postgres    false    3026    249    245            "           2606    34156    ventas_guardadas Relationship85    FK CONSTRAINT     �   ALTER TABLE ONLY public.ventas_guardadas
    ADD CONSTRAINT "Relationship85" FOREIGN KEY (venta_id) REFERENCES public.marketplace(venta_id) ON UPDATE CASCADE ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.ventas_guardadas DROP CONSTRAINT "Relationship85";
       public       postgres    false    263    2977    224            �           2606    34161    marketplace Relationship86    FK CONSTRAINT     �   ALTER TABLE ONLY public.marketplace
    ADD CONSTRAINT "Relationship86" FOREIGN KEY (categ_id) REFERENCES public.categoria(categ_id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.marketplace DROP CONSTRAINT "Relationship86";
       public       postgres    false    2939    224    200            �           2606    34166    marketplace Relationship87    FK CONSTRAINT     �   ALTER TABLE ONLY public.marketplace
    ADD CONSTRAINT "Relationship87" FOREIGN KEY (usuario_id) REFERENCES public.usuario(usuario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.marketplace DROP CONSTRAINT "Relationship87";
       public       postgres    false    261    224    3047                       2606    34171    publicacion Relationship9    FK CONSTRAINT     �   ALTER TABLE ONLY public.publicacion
    ADD CONSTRAINT "Relationship9" FOREIGN KEY (usuario_id) REFERENCES public.usuario(usuario_id) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.publicacion DROP CONSTRAINT "Relationship9";
       public       postgres    false    3047    243    261                        2606    34176    pagina_owner fk_pag    FK CONSTRAINT     }   ALTER TABLE ONLY public.pagina_owner
    ADD CONSTRAINT fk_pag FOREIGN KEY (pagina_id) REFERENCES public.paginas(pagina_id);
 =   ALTER TABLE ONLY public.pagina_owner DROP CONSTRAINT fk_pag;
       public       postgres    false    235    230    2991                       2606    34181    pagina_owner fk_user_pagowner    FK CONSTRAINT     �   ALTER TABLE ONLY public.pagina_owner
    ADD CONSTRAINT fk_user_pagowner FOREIGN KEY (usuario_id) REFERENCES public.usuario(usuario_id);
 G   ALTER TABLE ONLY public.pagina_owner DROP CONSTRAINT fk_user_pagowner;
       public       postgres    false    230    261    3047            �      x������ � �      �      x������ � �      �   Z   x�ʻ
�0�9���,��88�\b�@5��ů����iq���-rA�w��]*��f��u".Z��4!"�;�_��/6�ƀ�("�3��      �      x������ � �      �   -  x�=QKN�@];��	P�m�,mH�����$�t�Ɍ��T�q8 ΐ�16�ݳ߳�lgp��!Krx�ۈ
�i:J����A�U����to'e�ְn�4�c/�h�u�^�I��ю��V���,��<I��Ǚb/��g�������NJ�����I�sL�p�T+!�Ǟk�G�{c��Va����=-i�U���3���8��T�Kbz�3s<>�f�y	�ƫ��W�u���5�j���kxC&n�w����>�̲b��:R�˂�t�)�s�]�7႖}U��NQ��.I��>|?      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   ,   x�3�,NI,�4202�50�54R00�25�26�� �=... �ae      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x�3�tM.ML�/����� !x�      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �     