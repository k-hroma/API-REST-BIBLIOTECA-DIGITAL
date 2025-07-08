import express from 'express'
import cors from 'express'
import { booksRouter } from './routes/booksRoutes'
import { handleError } from './middleware/handleErrors'


// creo una instancia de la aplicación express necesaria para configurar las rutas, los middlewares y escuchar las peticones HTTP
const app = express()

// middleware que le permite al servidor parsear JSON en el cuerpo de las peticiones.
app.use(express.json())

// habilito cors -> va a permitir recibir peticiones desde otro dominio
app.use(cors())

// establezco la ruta base de los endpoints definidos dentro del router: booksRouter
app.use("/books", booksRouter)

// uso un middleware para manejar errores en las peticiones
app.use(handleError)

//exporto la applicación que utilizaré en la configuración del servidor
export { app }

