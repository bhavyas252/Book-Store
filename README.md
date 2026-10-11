Book Store

A full-stack book management application with a React single-page frontend and a RESTful Express/MongoDB backend. Browse a catalog of books and perform full CRUD operations against a MongoDB Atlas cluster.

Architecture

``
React SPA (Vite, port 5173)
        |
        |  Axios HTTP requests
        v
Express REST API (port 5555)
        |
        |  Mongoose ODM
        v
MongoDB Atlas (bookscollection)
`

Tech Stack

| Layer    | Technologies                                            |
| -------- | ------------------------------------------------------- |
| Frontend | React 19, React Router 7, Vite 7, Tailwind CSS 4, Axios  |
| UI       | notistack (toasts), react-icons                          |
| Backend  | Node.js, Express 5, Mongoose 9, CORS                     |
| Database | MongoDB Atlas                                            |
| Tooling  | ESLint 9, Nodemon, Docker                                 |

Features
• Browse all books in a responsive card layout on the home page
• View a single book's details by ID
• Create a new book with title, author, and publication year
• Edit an existing book's details
• Delete a book with a confirmation step
• Toast notifications for create, update, and delete actions
• Loading spinner state while requests are in flight


Data Model

The Book schema is defined in backend/models/bookModel.js:

| Field         | Type   | Required | Notes                       |
| ------------- | ------ | -------- | --------------------------- |
| title       | String | Yes      |                             |
| author      | String | Yes      |                             |
| publishYear | Number | Yes      |                             |
| createdAt   | Date   | Auto     | Added by timestamps: true |
| updatedAt   | Date   | Auto     | Added by timestamps: true |

API Reference

Base URL: http://localhost:5555

| Method   | Endpoint     | Description         | Success | Errors        |
| -------- | ------------ | ------------------- | ------- | ------------- |
| GET    | /          | Health check        | 234     | —             |
| GET    | /books     | List all books      | 200     | 500           |
| GET    | /books/:id | Get one book by ID  | 200     | 500           |
| POST   | /books     | Create a book       | 201     | 400, 500      |
| PUT    | /books/:id | Update a book by ID | 200     | 400, 404, 500 |
| DELETE | /books/:id | Delete a book by ID | 200     | 404, 500      |

POST and PUT return 400 when any of title, author, or publishYear is missing. PUT and DELETE return 404 when no book matches the given ID.

Example request

`bash
curl -X POST http://localhost:5555/books \
  -H "Content-Type: application/json" \
  -d '{"title":"The Pragmatic Programmer","author":"Hunt & Thomas","publishYear":1999}'
`

`json
{
  "id": "652f1c9e8a1b2c3d4e5f6789",
  "title": "The Pragmatic Programmer",
  "author": "Hunt & Thomas",
  "publishYear": 1999,
  "createdAt": "2026-10-11T00:00:00.000Z",
  "updatedAt": "2026-10-11T00:00:00.000Z"
}
`

GET /books wraps the results with a count:

`json
{
  "count": 1,
  "books": [{ "id": "...", "title": "...", "author": "...", "publishYear": 1999 }]
}
`

Frontend Routes

Defined in frontend/src/App.jsx:

| Path                 | Page       |
| -------------------- | ---------- |
| /                  | Home       |
| /books/create      | CreateBook |
| /books/details/:id | ShowBook   |
| /books/edit/:id    | EditBook   |
| /books/delete/:id  | DeleteBook |

Getting Started
Prerequisites
• Node.js 20+
• A MongoDB Atlas cluster (or a local MongoDB instance)
• npm

Backend

`bash
cd backend
npm install
npm run dev        # nodemon, auto-restarts on change
or: npm start
`

The server listens on port 5555 and mounts the book routes at /books.

Frontend

`bash
cd frontend
npm install
npm run dev        # Vite dev server on http://localhost:5173
`

The Vite dev server binds to 0.0.0.0, so it is reachable from outside a container.

Configuration

The backend reads its port and database connection from backend/config.js:

`js
export const PORT = 5555;
export const mongodbURL = "mongodb+srv://<user>:<password>@<cluster>/bookscollection";
`

Use environment variables instead of committing credentials. Create backend/.env:

`
PORT=5555
MONGODBURI=mongodb+srv://<user>:<password>@<cluster>/bookscollection
`

Then load it with process.env.MONGODBURI and add .env to .gitignore.

Docker

The frontend ships with a Dockerfile (Node 20.19.0 base):

`bash
cd frontend
docker build -t book-store-frontend .
docker run -p 5173:5173 book-store-frontend
`

Available Scripts
Backend

| Script        | Command            |
| ------------- | ------------------ |
| npm start   | node index.js    |
| npm run dev | nodemon index.js |

Frontend

| Script            | Command               |
| ----------------- | --------------------- |
| npm run dev     | vite --host 0.0.0.0 |
| npm run build   | vite build          |
| npm run preview | vite preview        |
| npm run lint    | eslint .            |

Implementation Notes
• The backend uses ES modules ("type": "module"), so files use import/export.
• express.json() parses incoming JSON bodies; cors() is enabled globally.
• bookRoutes is mounted as middleware, so route paths are relative to /books.
• The Book model relies on Mongoose schema validation for required fields, with an additional explicit check in the route handlers that returns a 400 before the database call.
• Frontend requests run through Axios against the backend base URL; notistack surfaces success and failure toasts, and a shared Spinner component covers pending states.

Known Limitations
• nodemodules/ is currently tracked in both backend/ and frontend/. Add it to .gitignore and untrack with git rm -r --cached backend/nodemodules frontend/node_modules.
• The connection string in backend/config.js` is hardcoded rather than read from the environment.
• The frontend Dockerfile runs the Vite dev server rather than a production build served statically.
• No test suite is configured on either the backend or the frontend.
