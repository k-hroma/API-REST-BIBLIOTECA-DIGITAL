import { connect, ConnectionStates }  from "mongoose";
import { ConnectResults } from "../types/connectDBResults";
process.loadEnvFile()

// 1. Defino variable para establecer conexión
const MONGO_URIDB = process.env.MONGO_URIDB || ""
let connectMDB: { isConnected: boolean } = {isConnected:false}

//2. Defino función asyncrónica para establecer conexión
const mongoDBConnection = async (): Promise<ConnectResults> => { 
  // verifico que exista la URI
  if (!MONGO_URIDB) { 
    const errMsg = "MongoDB URI is missing or empty"
    console.error(errMsg);
    return {
      success: false,
      message:errMsg
    }
  }
  // verifico si la conexión ya fue establecida
  if (connectMDB.isConnected) { 
    const msg = "Using existing MongoDB connection"
    console.info(msg)
    return {
      success: true, 
      message: msg
    }
  };
  
  try {
    // establezco la conexión con el método connect
    const resultConnection = await connect(MONGO_URIDB, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    })

    // verifico que no hayan errores en la conexión
    if (!resultConnection) { 
      throw new Error("Unexpected error while connecting MongoDB")
    }

    // verifico si mongoose está actualmente conectado a MongoDB
    const isConnected = resultConnection.connection.readyState === ConnectionStates.connected
    if (!isConnected) { 
      throw new Error("Connection established but not readyd")
    }

    // si no hubieron errores de conexión entonces modifico la propiedad de la variable connectMDB a true
    connectMDB.isConnected = true

    // agrego "escuchas" en los eventos de estado de conexion (disconnected y reconnected) de mongoose y actualizo la propiedad de la variable connectMDB
    resultConnection.connection.on('disconnected', () => {
      connectMDB.isConnected = false;
      console.warn("MongoDB connection lost")
    })
    
    resultConnection.connection.on('reconnected', () => { 
      connectMDB.isConnected = true;
      console.info("MongoDB connection reestablished.")
    })

    // finalmente envío un mensaje de conexión exitosa y retorno un objeto que respeta la interface de ConnectResult
    const msg = "MongoDB connected successfully."
    console.log(`${msg} Host: ${resultConnection.connection.host}`)
    return {
      success: true,
      message:msg
    }
    
  } catch (error: unknown) {
    // manejo de errores y retorno de un objeto que respeta la interface de ConnectResult
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error(errMsg)
    return {
      success: false,
      message: errMsg
    }
    
  }

}

// export la función de conexión
export { mongoDBConnection }