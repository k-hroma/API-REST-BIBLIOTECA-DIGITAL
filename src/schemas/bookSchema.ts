import { z } from "zod";

// creo un esquema de validación con zod que define como debe ser mi objeto libro
const AddBookSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  author: z.string().trim().min(1, "Author is required"),
  publishedYear: z.number().int().optional(),
  genre: z.string().trim().optional(),
  available: z.boolean().optional().default(true),
}).strict(); //no se permitan propiedades adicionales

// creo el tipo AddBookBody correspondiente al AddBookSchema-> para utilizarlo como tipado de datos en el body de las peticiones POST
type AddBookBody = z.infer<typeof AddBookSchema>

// creo un esquema de validación para PATCH, donde todos los campos son opcionales
const UpdateBookSchema = z.object({
  title: z.string().trim().min(1, "Title is required").optional(),
  author: z.string().trim().min(1, "Author is required").optional(),
  publishedYear: z.number().int().optional(),
  genre: z.string().trim().optional(),
  available: z.boolean().optional(),
}).strict(); // no se permiten propiedades adicionales

// creo el tipo PatchBookBody correspondiente al PatchBookSchema -> para usarlo como tipado en el body de las peticiones PATCH
type UpdateBookBody = z.infer<typeof UpdateBookSchema>

// exporto los schemas y los tipos para utilizarlos en los controladores
export { AddBookBody, AddBookSchema, UpdateBookBody, UpdateBookSchema  }

