# 📚 API REST - Biblioteca Digital

API RESTful desarrollada con **Node.js**, **Express** y **MongoDB** para gestionar libros. Incorpora validación de datos con Zod, y sigue buenas prácticas para entornos de desarrollo modernos.

---

## 🚀 Tecnologías principales

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **Zod** (validación de esquemas)
- **cors**

---

## 🛠️ Instalación y configuración

```bash
git clone https://github.com/k-hroma/API-REST-BIBLIOTECA-DIGITAL.git
cd API-REST-BIBLIOTECA-DIGITAL
npm install
```

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=
MONGODB_URI=
```
---

## ▶️ Ejecución del servidor

```bash
npm run dev
```

Servidor disponible en: `http://localhost:PORT/`

---

## 📘 Endpoints principales

### 📚 Libros

| Método | Ruta            | Descripción              |
| ------ | --------------- | ------------------------ |
| GET    | /api/books      | Obtener todos los libros |
| GET    | /api/books/:id  | Obtener libro por ID     |
| POST   | /api/books      | Crear nuevo libro        |
| PATCH  | /api/books/:id  | Actualizar libro         |
| DELETE | /api/books/:id  | Eliminar libro           |

## 🧪 Validación de datos

Se utiliza **Zod** para definir y validar los esquemas de entrada. Por ejemplo:

```ts
const AddBookSchema = z.object({
  title: z.string().trim().min(1),
  author: z.string().trim().min(1),
  publishedYear: z.number().int().optional(),
  genre: z.string().trim().optional(),
  available: z.boolean().optional().default(true)
}).strict()
```

---

## 📂 Estructura del proyecto

```
📁 src/
├── 📁 config
├── 📁 controllers
├── 📁 routes
├── 📁 models
├── 📁 middlewares
├── 📁 schemas
├── 📁 types
├── app.ts
└── server.ts
└── main.ts
```

---

## 📖 Licencia

MIT License

---

## 👤 Autor

**k-hroma** – [https://github.com/k-hroma](https://github.com/k-hroma)

