import { Router } from "express";
import { getBooks, getBooksById, addBook, updateBook, deleteBook } from "../controllers/booksControllers";

//creo un router en express
const booksRouter = Router()

// defino todos los endpoints de las peticiones HTTP
booksRouter.get("/", getBooks)
booksRouter.get("/:id", getBooksById)
booksRouter.post("/", addBook)
booksRouter.patch("/:id", updateBook)
booksRouter.delete("/:id", deleteBook)

// exporto el router creado p ara poder usarlo en la app
export { booksRouter }