import { app } from "./app";
import { mongoDBConnection } from "./config/mongoDB";
import { ConnectResults } from "./types/connectDBResults";
process.loadEnvFile()

// 1. Defino la vairable PORT (.env)
const PORT = Number(process.env.PORT) || 3000

// 2. Defino la función asincrónica que dará inicio al servidor
const startServer = async (): Promise<ConnectResults> => {
  // verifico la existencia de la variable de entorno para establecer el puerto y su es un número válido
  if (!PORT || Number.isNaN(PORT)) {
    const errMsg = "Invalid or missing PORT environment variable."
    console.error(errMsg)
    return {
      success: false,
      message: errMsg
    }
  }
  try {
    // llamo a la función que establece la conexión con la base de datos
    const dbConnect = await mongoDBConnection()
    // utilizo el objeto que retorna esa función para verificar que la conexión se haya realizado correctemante
    if (!dbConnect.success) {
      const errMsg = dbConnect.message
      console.error(errMsg)
      throw new Error(errMsg)
    }
    // si la conexión es correcta envío un mensaje a la consola
    console.log(dbConnect.message)

    const msgConfirmation = `Server is running on port ${PORT};`
    const apiUrlBooks = `http://localhost:${PORT}/books`;

    // el servidor express comienza a escuchar las conexiones entrantes en el puerto definido en la variable de entorno
    const listenPort = app.listen(PORT, () => {
      console.log(msgConfirmation);
      console.log(`API Books available at: ${apiUrlBooks}`)
    });

    // app.listen() siempre devuelve un servidor válido o lanza un error, asi que no es necesario verificarlo

    // si todo va bien retorno un objeto que respeta la interface de ConnectResult

    return {
      success: true,
      message: msgConfirmation
    }
    
  } catch (error: unknown) {
    // manejo de errores y retorno de un objeto que respeta la interface de ConnectResult
    const errMsg = error instanceof Error ? error.message : "Unknown error"
    console.error(errMsg)
    return {
      success: false,
      message: errMsg
    }
  }
};

// exporto la función para utilizarla en el main
export {startServer }