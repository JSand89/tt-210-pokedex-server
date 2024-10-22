# pokedex-api

<img src="img/JavierSanchez.png" alt="Header Javier">

## Objetivo

El servidor para crear una pokedex usando como base la pokeapi dentro de un proyecto academico con el bootcamp 210 talento tech

## primeros pasos
Recuerda debes tener instalado [Node.js](https://nodejs.org/en/download), despues crea y entra a la carpeta donde vas a guardar el proyecto. 
```
mkdir servidor
cd servidor
```
Una vez dentro de la carpeta usa el siguiente comando para crear un archivo que contendra la informacion de configuracion del proyecto (recuerda personalizarla). Deja el punto de entrada como index.js
```
npm init
```

Vamos a instalar express.js

```
npm install express
```
les debe aparecer un archivo package-lock.json y una carpeta node_modules, en este momento es buena idea crear el .gitignore para que no se suba esta ultima.
```
touch .gitignore
```
dentro poner
```
node_modules
```
Ahora vamos a crear un archivo llamado index.js
```
touch index.js
```


al final de esta seccion deben tener algo parecido a esto: 



<img src="img/primeros_pasos.png" alt="estructura de carpetas y archivos al final primeros pasos">

## Hola Mundo

Dentro de index.js vamos a poner el siguiente codigo:
```
const express = require('express')

const app = express()
const port = (process.env.PORT || 3005)
app.set('port', port)

app.get('/', (req, res) => {
  res.send('Hola entrenador')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

Para levantar el servidor vamos a correr el siguiente comando en una consola al nivel del index.js
```
node index.js
```
Si abren el navegador y escriben la dirección 127.0.0.1:3005, encontrarán el clásico "Hola entrenador".

en routes

```
const express = require("express")

const router = express.Router()

router.get("/",(req,res)=>{
    res.send("Hola entrenador desde la API")
})

module.exports = router
```

en index.js
```
const express = require("express")
const pokemonRoutes = require("./routes/pokemon")
const app = express()
const port = 3000

app.set("port",port)

//Rutas
app.get("/",(req,res)=>{
    res.send("Hola entrenador")
})
app.use("/api/pokemon",pokemonRoutes)

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})
```

Probando los controladores

```
exports.saludoEntrenador = async (req,res)=>{
    try {
        res.send("Hola entrenador ahora desde el controlador")
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
```

routes
```
const express = require("express")
const pokemonController = require("../controllers/pokemon")
const router = express.Router()

router.get("/",pokemonController.saludoEntrenador)

module.exports = router
```
Ahora vamos a empezar a trabajar con los modelos, para esto vamos a instalar mongoose como ORM y dotenv para el manejo de las variables de entorno
```
npm install dotenv mongoose

```

Lo de las variables de entorno


conectar la bd
```
const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

const pokemonRoutes = require("./routes/pokemon")

const app = express()
const port = 3000

app.set("port",port)

//Rutas
app.get("/",(req,res)=>{
    res.send("Hola entrenador")
})
app.use("/api/pokemon",pokemonRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log("Conect to DB")})
    .catch((err)=>console.error(err.message))

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})
```