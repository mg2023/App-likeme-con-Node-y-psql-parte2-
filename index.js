const express = require('express')
const app = express()
const { agregarPost, leerPost, modificarPost, borrarPost} = require('./operacionesbd.js')

app.use(express.json())

const cors = require('cors')


app.listen(3000, () => {
    console.log('El servidor esta ok')
})

app.use(cors())

app.get('/posts', async (req, res) => {
    const ans = await leerPost()
    console.log(ans)
    if (ans != 500){
        res.json(ans)
    }
    else{
        res.sendStatus(ans)
    }    
})

app.post("/posts", async (req, res) => {
    const {titulo, img, descripcion} = req.body
    console.log(req.body)
    const result = await agregarPost(titulo, img, descripcion, 0)
    if(result != 500){
        res.status(200).send(result)
    }
    else{
        res.sendStatus(result)
    }
})


////BACKEND Desarrollado para front desarrollador con vite(ultima version entregada)
/*1. Agregar una ruta PUT en una API REST y utilizarla para modificar registros en una
tabla alojada en PostgreSQL (4 puntos)*/
app.put('/posts/like/:id', async (req, res) => {    
    const id = req.params.id
    console.log(id)
    const ans = await modificarPost(id)
 
    if (ans == 200) {
        res.status(ans).send("PUT realizado");
    }
    else{
        res.status(ans).send("PUT con falla");
    }
})

/*2. Agregar una ruta DELETE en una API REST y utilizarla para eliminar registros en una
tabla alojada en PostgreSQL (4 puntos) */
app.delete('/posts/:id', async (req, res) => {
    const {id} = req.params
    console.log(id)
    const ans = await borrarPost(id)
    if (ans == 200) {
        res.status(ans).send("DELETE realizado");
    }
    else{
        res.status(ans).send("DELETE con falla");
    }
})
