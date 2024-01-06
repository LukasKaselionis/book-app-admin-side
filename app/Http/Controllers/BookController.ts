import { Request, Response } from "express";
import { Book } from "../../Models/BookSchema";

export default class BookController {
    public async list(req: Request, res: Response): Promise<void> {
        const books = await Book.find();
        res.send({ books });
    }
    public async create(req: Request, res: Response): Promise<void> {
        const { title, description, imagePath, filePath } = req.body;

        // TODO: !title || !descriptio || !imagePath || !filePath
        if (!title || !description) {
            res.status(422).json({ message: "Missing required fields" });

            return;
        }

        // TODO: upload file and image, then save book

        const book = new Book({
            title,
            description,
            imagePath,
            filePath
        });

        await book
            .save()
            .then(() => {
                res.status(201).json({
                    message: "Book created successfully!",
                });
            })
            .catch(() => {
                res.status(500).json({
                    message: "An error occurred during create new book",
                });
            });
    }
    public async update(req: Request, res: Response): Promise<void> {
        const { id, title, description, imagePath, filePath } = req.body;
        const book = await Book.findOne({ _id: id });

        if (!book) {
            res.status(404).json({ message: "Book not found" });

            return;
        }

        // TODO: if file or image is new, update them

        if (title) book.title = title;
        if (description) book.description = description;
        if (imagePath) book.imagePath = imagePath;
        if (filePath) book.filePath = filePath;

        await book.save()
            .then(() => {
                res.send({ message: "Book updated successfully", book });
            })
            .catch(() => {
                res.status(500).send({ message: "Internal server error" });
            });
    }
    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.body;
        const book = await Book.findByIdAndDelete(id);

        if (book) {
            res.json({ message: "Book deleted successfully" });
        } else {
            res.status(404).json({ error: "Book not found" });
        }
    }
}
