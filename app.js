const express = require("express");
const app = express();

const { Server } = require("socket.io");
const connectToDatabase = require("./database");
const book = require("./model/bookModel");
connectToDatabase();

const server = app.listen(4000, () => {
  console.log("Server running on port 3000");
});

const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("addBook", async (data) => {
    if (data) {
      const { bookName, bookPrice } = data;
      //sending data to database
      const newBook = await book.create({
        bookName,
        bookPrice,
      });

      //sending data to all clients
      socket.emit("bookAdded", {
        status: 200,
        message: "Book Added Successfully",
        data: newBook,
      });
    }
  });

  //getBooks
  socket.on("getBooks", async () => {
    const books = await book.find();
    console.log(books);
    socket.emit("bookDisplayed", {
      status: 200,
      message: "data displayed successfully",
      data: books,
    });
  });

  //update Book

  socket.on("updateBook", async (data) => {
    try {
      if (data) {
        const { bookName, bookPrice, bookId } = data;
        const updatedBook = await book.findByIdAndUpdate(
          bookId,
          {
            bookName,
            bookPrice,
          },
          { new: true }
        );
        socket.emit("bookUpdated", {
          status: 200,
          message: "book update has been successfully",
          data: updatedBook,
        });
      }
    } catch (error) {
      socket.emit("response", { status: 500, message: "something went wrong" });
    }
  });

  //delete book

  socket.on("deleteBook", async (data) => {
    if (data) {
      const { bookId } = data;
      await book.findByIdAndDelete(bookId);
      socket.emit("response", {
        status: 200,
        message: "book deleted successfully",
      });
      console.log("Emitting bookAdded event:", deleteBook);
    }
  });
});
