import { Request, Response, NextFunction } from "express"
import { ErrorResult } from "../types/errorResults"


// creo una función encargada de manejar los errores del bloque catch de cada función controladora de las peticiones y retorno un objeto que tiene una estructura tipada con la interface ErrorResult
// esta función la utilizo en la app de express

const handleError = (error: unknown, req: Request, res: Response<ErrorResult>, next: NextFunction) => {
  const errMsg = error instanceof Error ? error.message : "Unexpected error"
  const errCode = (error as any).code || 500

  res.status(500).json({
    success: false,
    message: errMsg,
    errorCode: errCode
  })
};

export { handleError }