const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  bookName: String,
  bookPrice: Number,
});

const book = mongoose.model("book", bookSchema);

module.exports = book;
