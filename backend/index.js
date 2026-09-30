import express from "express";
import mongoose from "mongoose";
import { PORT, mongodbURL } from "./config.js";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   }),
// );

app.get("/", (request, response) => {
  console.log(request);
  response.status(234).send("Welcome to the Bookstore!");
});

app.use("/books", bookRoutes); // for any request with /books, use the routes from bookRoutes -- acts as middleware

mongoose
  .connect(mongodbURL)
  .then(
    () => console.log("App connected to database!"),
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    }),
  )
  .catch((error) => console.log(error));
