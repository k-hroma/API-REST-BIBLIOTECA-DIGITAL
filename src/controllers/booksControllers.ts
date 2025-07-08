import { Request, Response, NextFunction } from "express"

const getBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => { }

const getBooksById = async (req: Request, res: Response, next: NextFunction): Promise<void> => { }

const addBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => { }

const updateBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => { }

const deleteBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => { }


export { getBooks, getBooksById, addBook, updateBook, deleteBook}