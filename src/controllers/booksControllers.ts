import { Request, Response, NextFunction } from "express"
import { QueryResponse } from "../types/queryResponse"
import { Book } from "../models/bookModel";
import { AddBookBody, AddBookSchema, UpdateBookBody, UpdateBookSchema } from '../schemas/bookSchema'
import { IBook } from "../types/bookInterface";
import mongoose from "mongoose";


const getBooks = async (req: Request, res: Response<QueryResponse>, next: NextFunction): Promise<void> => {
  try {
    // .find() siempre devuelve un array, no es necesario verificar que exista
    const books: IBook[] = await Book.find()
    res.status(200).json({
      success: true,
      message: books.length > 0 ? "Books found: " : "Database is empty",
      data: books
    });
    return
    
  } catch (error: unknown) {
    next(error)
    return 
  }
};

const getBooksById = async (req: Request<{ id: string }>, res: Response<QueryResponse>, next: NextFunction): Promise<void> => {
  // desestructuración de parámetros
  const { id } = req.params
  
  // verificar que exista ID
  if (!id) {
    const errMsg = "Book ID is required."
    res.status(400).json({
      success: false,
      message: errMsg
    })
    console.error(errMsg)
    return
  };

  // verificar que el ID tenga el formato correcto
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
    success: false,
    message: "Invalid ID format"
  })
  return
  };
  
  try {
  // si el ID es válido entonces se busca en la base de datos
    const book = await Book.findById(id)
    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      })
      return
    }

    res.status(200).json({
      success: true,
      message: "Book found",
      data: book,
    })
    
  } catch (error: unknown) {
    next(error)
    return
  }
};

const addBook = async (req: Request<{}, {}, AddBookBody>, res: Response<QueryResponse>, next: NextFunction): Promise<void> => {
  
  // valido los datos recibidos en el body usando Zod-> devuelve un objeto {success/data o success/erros}
  const parseResult = AddBookSchema.safeParse(req.body)
  
  if (!parseResult.success) {
    res.status(400).json({
      success: false,
      message: "Invalid input data",
      error: parseResult.error.errors //lista de errores generados por zod
    });
    return;
  }

  const dataBook = parseResult.data;

  try {
    // intenta crear un nuevo libro
    // creo una nueva instancia del model Book y paso los datos validados
    // lo guardo
    const newBook = await new Book(dataBook).save()
    
    res.status(201).json({
      success: true,
      message: "Book successfully created.",
      data: newBook
    });
    return

  } catch (error: unknown) {
    // antes de utilizar el handle erro verifico que el título no exista en la base de datos
   
    if ((error as any).code === 11000) {
      res.status(409).json({
        success: false,
        message: "The title already exists in the database",
        error: 11000
      });
      return;
    }
    next(error)
    return
  }
};

const updateBook = async (req: Request<{ id: string }, {}, UpdateBookBody>, res: Response<QueryResponse>, next: NextFunction): Promise<void> => { 
  // desestructuracion de parametros
  const { id } = req.params
  // verificar que exista ID
  if (!id) {
    const errMsg = "Book ID is required."
    res.status(400).json({
      success: false,
      message: errMsg
    })
    console.error(errMsg)
    return
  };

  // verificar que el ID tenga el formato correcto
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
    success: false,
    message: "Invalid ID format"
  })
  return
  };

  // valido que los datos tengan el formato del updateBookSchema con zod
  const parseResult = UpdateBookSchema.safeParse(req.body);
   if (!parseResult.success) {
    res.status(400).json({
      success: false,
      message: "Invalid input data",
      error: parseResult.error.errors
    });
    return;
  }
  //si el formato es correcto almaceno en una variable los datos recibidos en el body
  const updateDataBook = parseResult.data;
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, updateDataBook, { new: true });
    if (!updatedBook) {
      res.status(404).json({
        success: false,
        message: `Book with ID ${id} not found.`}
      );
    return;
    };

    res.status(200).json({
      success: true,
      message: "Book successfully updated",
      data: updatedBook
    });
    return
    
  } catch (error: unknown) {
    next(error)
    return
  }
};

const deleteBook = async (req: Request, res: Response<QueryResponse>, next: NextFunction): Promise<void> => { 
  // desestructuración de parámetros
  const { id } = req.params
  
  // verificar que exista ID
  if (!id) {
    const errMsg = "Book ID is required."
    res.status(400).json({
      success: false,
      message: errMsg
    })
    console.error(errMsg)
    return
  };

  // verificar que el ID tenga el formato correcto
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
    success: false,
    message: "Invalid ID format"
  })
  return
  };

  try {
    const deletedBook = await Book.findByIdAndDelete(id)
    if (!deletedBook) {
        res.status(404).json({
        success: false,
        message: `Book with ID ${id} not found.`
        });
      return;
      }
    res.status(200).json({
      success: true,
      message: "🗑️ Book successfully deleted.",
      data: deletedBook
    });
  } catch (error: unknown) {
    next(error)
    return
  }
};


export { getBooks, getBooksById, addBook, updateBook, deleteBook}