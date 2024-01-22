import mongoose from "mongoose";

const bookModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: false
    },
    filePath: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Book = mongoose.model("Book", bookModel);
