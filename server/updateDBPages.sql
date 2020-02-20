--- PARA MANEJAR ROLES

BEGIN;
CREATE TABLE pagina_owners(
	"id" serial8 not null PRIMARY KEY,
	"pagina_id" int4,
	"usuario_id" int4,
	"rol" varchar(10) default 'editor',
	 FOREIGN KEY ("usuario_id") REFERENCES usuario (usuario_id),
	 FOREIGN KEY ("pagina_id") REFERENCES paginas (pagina_id)
);

COMMIT;