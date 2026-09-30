import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send("Please input all the required fields");
    }

    const newBook = new Book({
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    });

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Get all the books in the database
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      books: books,
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Get book from database using id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

//Update book in database using id
router.put("/:id", async (request, response) => {
  const { id } = request.params;

  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Please enter all required fields",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(id, request.body);

    if (!updatedBook) {
      return response.status(404).send({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send(error.message);
  }
});

//Delete book from database using id
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    return response.status(500).send(error.message);
  }
});

export default router;
