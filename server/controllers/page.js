const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pages = {};

// Conexion a postgres
const {pool} = require('./../connect-database');

// Registrar Páginas
pages.register =  async (req, res) => {    
    let r = req.body;
    let user_id = req.user.id;
    let portada, logo;

    if(req.files.length <= 1) {
        return error(res, 'Se necesita una imagen de portada y logo')
    }

    if(!r.nombre || !r.categoria || !r.telefono) {
        return error(res, 'Es necesario especificar: NOMBRE, CATEGORÍA Y TELEFONO');
    }

    // ya existe la pagina ?
    const existPage = await pool.query(`SELECT pagina_id FROM paginas WHERE pagina_nombre = '${r.nombre.toUpperCase()}'`);
    if(existPage.rowCount > 0) {
        return error(res, 'Ya existe una pagina con este nombre');
    }

    if(req.files.length >= 2) {
        for(let i=0; i<req.files.length; i++) {
            if(req.files[i].fieldname === 'portada') {
                portada = await upload(req.files[i], 'pages/portada');
            }

            if(req.files[i].fieldname === 'logo') {
                logo = await upload(req.files[i], 'pages/logos');
             }            
        }
        
        removeTempFiles(req.files);
    }

    await pool.query('BEGIN');
    // crear página
    const query = `INSERT INTO paginas(
        pagina_logo, pagina_portada, pagina_nombre, pagina_categoria, pagina_nombreusuario, 
        pagina_telefono)
        VALUES ('${logo.fileName}', '${portada.fileName}', '${r.nombre.toUpperCase()}', 
                '${r.categoria.toLowerCase()}', '${r.nombre.toLowerCase()}', '${r.telefono}');`;

    result = await pool.query(query);
    if(result.rowCount <= 0) {
        return error(res, 'No se pudo crear la página');
    }

    // obtener pagina agregada
    const page = await pool.query(`Select pagina_id from paginas where pagina_nombre = '${r.nombre.toUpperCase()}'`);
    if(page.rowCount <= 0) {
        await pool.query('ROLLBACK');
        return error(res, 'No se puedo registrar la pagina')
    }

    const page_id = page.rows[0].pagina_id;
    // asginar owners
    const owners = await pool.query(`INSERT INTO public.pagina_owners(
        pagina_id, usuario_id, rol)
        VALUES (${page_id}, ${user_id}, 'admin');`);

    if(owners.rowCount <= 0) {
        await pool.query('ROLLBACK');
        return error(res, 'No se puedo registrar el rol para la página')
    }

    await pool.query('COMMIT');
    return ok(res, 'Página registrada con éxito');
};

// Modificar Página
pages.update = async (req, res) => {
    let r = req.body;
    let id = req.params.id;
    let portada, logo;

    if(!r.nombre || !r.categoria || !r.telefono) {
        return error(res, 'Es necesario especificar: NOMBRE, CATEGORÍA Y TELEFONO');
    }

    // obtener pagina a modificar
    const page = await pool.query(`Select p.pagina_id, p.pagina_portada, p.pagina_logo, o.usuario_id from paginas p 
        join pagina_owners o on o.pagina_id = p.pagina_id 
        where p.pagina_id = ${id} and o.usuario_id = ${req.user.id} and o.rol = 'admin' limit 1`);
    
    if(page.rowCount <= 0) {
        return error(res, 'No puedes modificar esta página');
    }

    // ya existe la pagina ?
    const existPage = await pool.query(`SELECT pagina_id FROM paginas WHERE pagina_nombre = '${r.nombre.toUpperCase()}' and pagina_id <> ${id}`);
    if(existPage.rowCount > 0) {
        return error(res, 'Ya existe una pagina con este nombre');
    }        

    if (req.files.length == 1 ) {
        if(req.files[0].fieldname === 'portada') {
            removeFile(page.rows[0].pagina_portada, 'portada');        
            const portadaFile = await upload(req.files[0], 'pages/portada');    
            portada = portadaFile.fileName;   
            logo = page.rows[0].pagina_logo;
        } 

        if(req.files[0].fieldname === 'logo') {
            removeFile(page.rows[0].pagina_logo, 'logos');
            const logoFile = await upload(req.files[0], 'pages/logos');
            logo = logoFile.fileName;
            portada = page.rows[0].pagina_portada;
        }
    } else if (req.files.length > 1) {
        for(let i = 0; i < req.files.length; i++) {
            if(req.files[i].fieldname === 'portada') {
                removeFile(page.rows[0].pagina_portada, 'portada');        
                const portadaFile = await upload(req.files[i], 'pages/portada');    
                portada = portadaFile.fileName;   
            }
            if(req.files[i].fieldname === 'logo') {
                removeFile(page.rows[0].pagina_logo, 'logos');
                const logoFile = await upload(req.files[i], 'pages/logos');
                logo = logoFile.fileName;
            }
        }                        
    } else {
        portada = page.rows[0].pagina_portada;
        logo = page.rows[0].pagina_logo;
    }

    removeTempFiles(req.files);

    const updatePage = await pool.query(`UPDATE paginas
        SET pagina_logo='${logo}', pagina_portada='${portada}', pagina_nombre='${r.nombre.toUpperCase()}',
        pagina_categoria='${r.categoria.toLowerCase()}', pagina_nombreusuario='${r.nombre.toLowerCase()}', 
        pagina_telefono='${r.telefono}' 
	    WHERE pagina_id = ${id}`);
    if(updatePage.rowCount <= 0) {
        return error(res, 'No se puedo actualizar la página');
    }
    return ok(res, 'Página actualizada con éxito');
};

// Eliminar Páginas
pages.destroy = async (req, res) => {

    const page_id = req.params.id;

    const pageExist = await pool.query(`Select p.pagina_id, p.pagina_portada, p.pagina_logo, o.usuario_id from paginas p 
        join pagina_owners o on o.pagina_id = p.pagina_id 
        where p.pagina_id = ${page_id} and o.rol = 'admin' limit 1`);
    
    if(pageExist.rowCount <= 0) {
        return error(res, 'No se puede eliminar esta página');
    }

    if(pageExist.rows[0].usuario_id !== req.user.id) {
        return error(res, 'No tienes permiso para eliminar esta página');
    }

    await pool.query('BEGIN');

    await pool.query('Delete from pagina_owners where pagina_id = '+page_id);

    await pool.query('Delete from pagina_seguidores where pagina_id = '+page_id);

    await pool.query('Delete from publicacion where pagina_id = '+page_id );

    const deletePage = await pool.query('Delete from paginas where pagina_id = '+page_id);
    if(deletePage.rowCount <=0){
        await pool.query('ROLLBACK');
        return error(res, 'No se puedo eliminar la página');
    }

    const portada = pageExist.rows[0].pagina_portada;
    const logo = pageExist.rows[0].pagina_logo;

    removeFile(portada, 'portada');
    removeFile(logo, 'logos');
   
    
    await pool.query('COMMIT');
    return ok(res, 'Página eliminada con éxito');
};

// Obtener páginas
pages.list = async (req, res) => {
    let limit = 20;

    if(req.query.limit) {
        limit = req.query.limit;
    }

    const page = await pool.query(`Select p.pagina_id, p.pagina_nombre, p.pagina_logo, p.pagina_categoria 
        from paginas p 
        join pagina_owners o on o.pagina_id = p.pagina_id 
        where o.usuario_id = ${req.user.id} limit ${limit}`);

    return object(res, page.rows);
};

// obtener pagina por id
pages.getById = async (req, res) => {
    const id = req.params.id;
    let isAdmin = false;
    let isEditor = false;
    const page = await pool.query(`Select * from paginas where pagina_id = ${id} limit 1`);

    if(page.rowCount<=0) {
        return error(res, 'No se encontró la página que buscas', 404);
    }

    const admin = await pool.query(`Select rol from pagina_owners where pagina_id = ${id} and usuario_id = ${req.user.id} limit 1`);
    if(admin.rowCount > 0) {
        if(admin.rows[0].rol === 'admin') {
            isAdmin = true;
            isEditor = true;
        }

        if(admin.rows[0].rol === 'editor') {
            isEditor = true;
            isAdmin = false;
        }
    }

    const isFollowed = await isFollow(req.user.id, id);
    const followNum = await getCoutFollow(id);

    return res.status(200).send({
        ok: true, 
        data: page.rows[0], 
        isAdmin, 
        isEditor, 
        isFollowed,
        followNum
    })
}

// Buscar páginas
pages.search = async (req, res) => {
    let categoria = '';
    let nombre = '';

    if (req.query.categoria) {
        categoria = req.query.categoria;
    }

    if(req.query.nombre) {
        nombre = req.query.nombre;
    }

    let page = null;

    if(!categoria)
        page = await pool.query(`Select * from paginas where pagina_nombre like '${nombre.toUpperCase()}%' order by pagina_nombre limit 10`);
    else
        page = await pool.query(`Select * from paginas where pagina_nombre like '${nombre.toUpperCase()}%' and pagina_categoria='${categoria.toLowerCase()}' order by pagina_nombre  limit 10`);    

    return object(res, page.rows);
};


/********* ROLES ***********/

// Asignar admins
pages.admin = async (req, res) => {
    const r = req.body;

    if(!r.rol || !r.target || !r.page_id ) {
       return error(res, 'Es necesario especificar: ROL, USUARIO, PÁGINA') 
    }

    if(r.rol.toLowerCase() !== 'admin' && r.rol.toLowerCase() !== 'editor') {
        return error(res, 'Rol no valido') 
    }

    const pageExist = await pool.query(`Select p.pagina_id, p.pagina_portada, p.pagina_logo, o.usuario_id from paginas p 
        join pagina_owners o on o.pagina_id = p.pagina_id 
        where p.pagina_id = ${r.page_id} and o.usuario_id = ${req.user.id} and o.rol = 'admin' limit 1`);

    if(pageExist.rowCount <= 0) {
        return error(res, 'No puede asignar roles en esta página');
    }

    const userExist = await pool.query('Select usuario_id from usuario where usuario_id = '+r.target);
    if(userExist.rowCount <= 0) {
        return error(res, 'El usuario al que intenta asignar el rol no existe');
    }

    eliminarRol(r.target, r.page_id);
    const insertOwner = await pool.query(`INSERT INTO pagina_owners(
        pagina_id, usuario_id, rol)
        VALUES (${r.page_id}, ${r.target}, '${r.rol}');`);

    if(insertOwner.rowCount <=0) {
        return error(res, 'No se puedo asignar el rol');
    }

    return ok(res, 'Rol asignado correctamente');
};

// Eliminar admins
pages.adminRemove = async (req, res) => {
    const r = req.body;

    if(!r.target || !r.page_id ) {
       return error(res, 'Es necesario especificar: ROL, USUARIO, PÁGINA') 
    }

    if(r.target === req.user.id) {
        return error(res, 'No puedes eliminarte tu mismo');
    }

    const pageExist = await pool.query(`Select p.pagina_id, p.pagina_portada, p.pagina_logo, o.usuario_id from paginas p 
        join pagina_owners o on o.pagina_id = p.pagina_id 
        where p.pagina_id = ${r.page_id} and o.usuario_id = ${req.user.id} and o.rol = 'admin' limit 1`);

    if(pageExist.rowCount <= 0) {
        return error(res, 'No puede eliminar roles en esta página');
    }

    if(!eliminarRol(r.target, r.page_id)) {
        return error(res, 'No se pudo eliminar al usuario del staff');
    }

    return ok(res, 'Usuario eliminado del Staff');
};

// Obtener admins
pages.getAdmins = async (req, res) => {
    const page_id = req.params.page;
    
    const pageExist = await pool.query(`Select p.pagina_id, o.usuario_id from paginas p 
        join pagina_owners o on o.pagina_id = p.pagina_id 
        where p.pagina_id = ${page_id} and o.usuario_id = ${req.user.id} and o.rol = 'admin' limit 1`);

    if(pageExist.rowCount <= 0) {
        return error(res, 'No puedes ver los roles de esta página');
    }

    const roles = await pool.query(`Select u.usuario_id, u.usuario_nombres, u.usuario_apellidos, o.rol from usuario u join pagina_owners o on u.usuario_id = o.usuario_id
         where o.pagina_id = ${page_id}`);
    
    return object(res, roles.rows);

};



eliminarRol = async (usuario_id, pagina_id) => {
    const rolDel = await pool.query(`Delete from pagina_owners where usuario_id = ${usuario_id} and pagina_id = ${pagina_id}`);
    if(rolDel.rowCount <= 0) {
        return false;
    }
    return true;
}


// Seguir pagina
pages.follow = async (req, res) => {
    const id = req.params.id;
    const isFollowed = await isFollow(req.user.id, id);
    if(isFollowed) {
        await removeFollow(req.user.id, id);
        return ok(res, 'Has dejado de seguir esta página');
    }

    const follow = await pool.query(`INSERT INTO pagina_seguidores(
        pagina_id, usuario_id)
        VALUES (${id}, ${req.user.id});`);

    if(follow.rowCount <= 0) {
        return error(res, 'No se ha podido seguir esta página');
    }

    return ok(res, 'Has seguido esta página');
};

pages.getFollows = async (req, res) => {
    const id = req.params.id;
    let page = 1;
    let limit = 7;
    // pagination
    if(req.query.page )
        page = req.query.page;

    // limit
    if(req.query.limit )
        limit = req.query.limit;

    let lo = limit_offset(page, limit);

    if(req.query.limit)
        limit = req.query.limit;

    const allFollow = await pool.query(`
        Select u.usuario_id, concat(u.usuario_nombres,' ' ,u.usuario_apellidos) as usuario from usuario u join pagina_seguidores ps on u.usuario_id = ps.usuario_id 
        where pagina_id = ${id} limit ${lo.limit} offset ${lo.offset};
    `);

    return object(res, allFollow.rows);
}


isFollow = async (userId, pageId) => {
    const follow = await pool.query(`Select * from pagina_seguidores where usuario_id = ${userId} and pagina_id = ${pageId} limit 1`);
    if (follow.rowCount>0) {
        return true;
    }
    return false;
}

removeFollow = async (userId, pageId) => {
    const deleted = await pool.query(`Delete from pagina_seguidores where usuario_id = ${userId} and pagina_id = ${pageId}`);
    if(deleted.rowCount > 0) {
        return true;
    }
    return false;
}

getCoutFollow = async (pageId) => {
    const count = await pool.query(`Select pagina_id from pagina_seguidores where pagina_id = ${pageId}`);
    return count.rowCount;
};


/******** PUBLICACIONES ********/

// publicar en la página
pages.publish = async (req, res) => {    
    const r = req.body;
    let image = '';
    let type = 'text';

    if(!r.page) return error(res, 'Especifique una página');

    if(!r.text && req.files.length <=0)
        return error(res,"Ingresa un contenido");
    
    if(req.files && req.files.length>0) {
        image = await upload(req.files[0], 'pages/publication');    
    }

    let fileName = null;
    if(image.fileName !== undefined ){
        fileName = image.fileName;
        if(image.ext === 'mp4') {
            type = 'video';
        } else {
            type = 'img';
        }
    }

    let text = (!r.text || r.text === null) ? '': r.text;
    
    const pub = await pool.query(`INSERT INTO public.publicacion(
        pub_texto, "pub_pathMult", pub_fechahora, pub_tipo, 
        pub_duracion, pub_estado, usuario_id, perfilusu_id, 
        grupo_id, pagina_id, evento_id)
        VALUES ('${text.replace('null', '')}', `+ ( fileName ? "'"+fileName+"'" : null ) + ` , now(), '${type}', '-1', true, ${req.user.id}, null, null, ${r.page}, null)`);
    if(pub.rowCount<=0) {
        return error(res, 'No se pudo crear la publicación');
    }

    removeTempFiles(req.files);
    return ok(res, 'Publicación agregada');
};

// listar publicaciones
pages.publishList = async (req, res) => {
    const id = req.params.id;
    let page = 1;
    let limit = 7;
    // pagination
    if(req.query.page )
        page = req.query.page;

    // limit
    if(req.query.limit )
        limit = req.query.limit;

    let lo = limit_offset(page, limit);

    const publications = await pool.query(`
            SELECT
            publicacion.pub_id,
            publicacion.pub_texto,
            publicacion."pub_pathMult",
            publicacion.pub_fechahora,
            publicacion.pub_tipo, 
            concat(usuario.usuario_nombres, ' ' ,
            usuario.usuario_apellidos) as usuario,
            publicacion.usuario_id,
            publicacion.pagina_id
            FROM
            publicacion
            INNER JOIN usuario ON publicacion.usuario_id = usuario.usuario_id
            WHERE publicacion.pagina_id = ${id} and publicacion.usuario_id > 0 
            ORDER BY publicacion.pub_fechahora desc LIMIT ${lo.limit} OFFSET ${lo.offset} 
    `);

    return object(res, publications.rows);
};

pages.publishImages = async (req, res) => {

    let type = 'img';

    if (req.query.type) 
        type = req.query.type;

    const id = req.params.id;
    const publications = await pool.query(`
            SELECT
            publicacion.pub_id,
            publicacion."pub_pathMult",
            publicacion.pub_fechahora,
            concat(usuario.usuario_nombres, ' ' ,
            usuario.usuario_apellidos) as usuario
            FROM
            publicacion
            INNER JOIN usuario ON publicacion.usuario_id = usuario.usuario_id
            WHERE publicacion.pagina_id = ${id} and publicacion.usuario_id > 0 and publicacion.pub_tipo = '${type}'
            ORDER BY publicacion.pub_fechahora desc limit 30
    `);

    return object(res, publications.rows);
};

// ver imagenes
pages.getImage = (req, res) => {
    let image_file = req.params.imageFile;

    let folder = req.params.type;

    if(folder !=='portada' && folder!=='logos' && folder!=='publication') {
        return res.status(404).send({message:"No existe la imagen"})
    }

    let path_file = `./uploads/pages/${folder}/${image_file}`;
    fs.exists(path_file, exist => {
        if(exist)
             res.sendFile(path.resolve(path_file));
        else
            return res.status(404).send({message:"No existe la imagen"})
    })
}

pages.searchUser = async(req, res) => {
    let search = req.query.search;

    if(!search) return object(res, {});

    const users = await pool.query(`Select concat(usuario_nombres, ' ', usuario_apellidos) as usuario, usuario_id from usuario 
        where  (usuario_nombres like '${search}%' or  usuario_apellidos like '${search}%') and usuario_id <> ${req.user.id} limit 5`);

    return object(res, users.rows);
}

/* FUNCIONES */

const upload = (file, folder='pages') => {        
    return new Promise( ( resolve, reject ) => {
        let nametmp = file.filename.split('.');
        let ext = nametmp[nametmp.length - 1];
    
        let validExts = ['jpg', 'png', 'jpeg', 'mp4'];

        if(validExts.indexOf(ext) < 0 ){
            reject("Extension no válida");
        }

        let fileName = `${Math.round((new Date()).getTime()/1000)}.${ext}`;
        fs.copyFile(file.path, `uploads/${folder}/${fileName}`, (err) => {
            if(err){ console.log(err); reject(null)}            
            resolve({ fileName, ext })
        });
    })
    //return { fileName, ext };
}

const removeTempFiles = (files) => {
    if(files.length > 0) {
        for(let i = 0; i<files.length; i++) {
            if(fs.existsSync(files[i].path)) {
                //fs.unlink(files[i].path);
                fs.unlinkSync(files[i].path);
            }
        }
    }
}

const removeFile = (fileName, type)  => {
    if(fileName && fs.existsSync(`./uploads/pages/${type}/${fileName}`)){
        fs.unlinkSync(`./uploads/pages/${type}/${fileName}`);
    }
}

/*RESPUESTAS*/
const error = (res, msg, code=400) =>{
    return res.status(code).send({
        ok: false,
        message: msg            
    })
};

const ok = ( res, msg) =>{
    return res.status(200).send({
        ok: true,
        message: msg
    })
};

const all = (res, data) =>{
    return res.status(200).send({
        ok: true,
        data
    })
};

const object = (res, object) =>{
    return res.status(200).send({ok: true,
        data: object})
};

const limit_offset = (page, pageSize = 10) =>{
        
    if(page< 1)
        page = 1;

    const offset = (page-1) * pageSize;
    const limit = parseInt(pageSize);    
    return {
        offset, limit
    } 
}


module.exports = pages;