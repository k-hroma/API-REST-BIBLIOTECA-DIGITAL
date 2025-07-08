import { Schema, model } from "mongoose";
import { IBook } from "../types/bookInterface";

// defino la estructura del documento Book
const bookSchema = new Schema<IBook>({
  title: {type: String, required:true, unique:true, trim: true},
  author: { type: String, required: true, trim: true },
  publishedYear: {type:Number, required:false},
  genre: { type: String, required: false, trim:true },
  available: {type:Boolean, default:true}
}, {versionKey:false,  timestamps: true,})

// creo el modelo de mongoose "Book" que utiliza bookSchema.
const Book = model<IBook>("Book", bookSchema)

export { Book }