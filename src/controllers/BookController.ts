import path from "path";
import { Request, Response } from "express";
import { Book } from "../models/BookModel";
import { unlink } from "fs";

export default class BookController {
    public async list(req: Request, res: Response): Promise<void> {
        const books = await Book.find();
        res.send({ books });
    }
    public async create(req: Request, res: Response): Promise<void> {
        const { title, description } = req.body;
        let { imagePath, filePath } = req.body;

        if (!title || !description) {
            res.status(422).json({ message: "Missing required fields" });

            return;
        }

        const existingBook = await Book.findOne({ title });
        if (existingBook) {
            res.status(409).json({ message: "A book with the same title already exists" });

            return;
        }

        if (req.files) {
            imagePath = await this.generateFilePath(req.files, "imagePath");
            filePath = await this.generateFilePath(req.files, "filePath");
        }

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
                    book
                });
            })
            .catch(() => {
                res.status(500).json({ message: "An error occurred during create new book" });
            });
    }
    public async update(req: Request, res: Response): Promise<void> {
        const { id, title, description } = req.body;
        const book = await Book.findOne({ _id: id });

        if (!book) {
            res.status(404).json({ message: "Book not found" });

            return;
        }

        if (title) book.title = title;
        if (description) book.description = description;
        if (req.files) {
            if (book.imagePath) {
                await this.removeOldFiles([book.imagePath]);
            }

            if (book.filePath) {
                await this.removeOldFiles([book.filePath]);
            }

            book.imagePath = await this.generateFilePath(req.files, "imagePath");
            book.filePath = await this.generateFilePath(req.files, "filePath");
        }

        await book.save()
            .then(() => {
                res.send({ message: "Book updated successfully" });
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
            res.status(404).json({ message: "Book not found" });
        }
    }

    private generateFilePath
    (
        files: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[],
        fieldName: string
    ): Promise<string> {
        return new Promise<string>((resolve) => {
            for (const fileArray of Object.values(files)) {
                for (const file of fileArray) {
                    if (file.fieldname === fieldName) {
                        resolve(file.path);

                        return;
                    }
                }
            }

            resolve("");
        });
    }

    private async removeOldFiles(files: string[]): Promise<void> {
        const uploadsFolder: string = path.join(__dirname, "../../../");
        for (const file of files) {
            const filePath: string = path.join(uploadsFolder, file);
            unlink(filePath, () => {});
        }
    }
}
