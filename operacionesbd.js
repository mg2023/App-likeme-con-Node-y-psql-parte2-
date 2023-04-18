//2. Usar el paguete pg (2pts)
const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'ok',
    database: 'likeme',
    allowExitOnIdle: true
})

/*3. Capturar los posibles errores en una consulta SQL realizada con el paquete pg
usando la sentencia try catch (2 puntos)*/
const agregarPost = async (titulo, url, descripcion, likes) => {
    if(titulo, url, descripcion){
        const values = [titulo, url, descripcion, likes]
        const consulta = "INSERT INTO posts (id,titulo,img,descripcion, likes) VALUES (DEFAULT, $1, $2, $3,$4) RETURNING *"        
        try{
            const result = await pool.query(consulta, values)
            const { rows } = result;
            console.log(rows[0])
            return rows[0];
        }
        catch{
            //Fail connect to db
            return(500)
        }
    }
    //Bad request
    console.log("post fallando con bad request")
    return(400)
}

const leerPost = async () => {
    try{
        const { rows } = await pool.query("SELECT * FROM posts")
        return rows 
    }
    catch{
        //bad request
        return(400)
    }    
}

const modificarPost = async (id) => {
    try{
        let consulta = "SELECT likes FROM posts WHERE id = $1"
        let { rows } = await pool.query(consulta,[id])
        const cantLikes = rows[0].likes + 1;
        consulta = "UPDATE posts SET likes = $2 WHERE id = $1 RETURNING *";
        const values = [id, cantLikes]
        const result = await pool.query(consulta, values);
        //No  necesita devolver data
        //return result.rows[0].likes;    
        return (200);  
    }
    catch{
        //bad request
        return(400)
    }
}

const borrarPost = async (id) => {
    try{
        const consulta = 'DELETE FROM posts WHERE id = $1'
        const result = await pool.query(consulta,[id])
        return(200)
    }
    catch{
        //bad request
        console.log("falla el borrado en la bd")
        return(400)        
    }
}

module.exports = { agregarPost, leerPost, modificarPost, borrarPost }