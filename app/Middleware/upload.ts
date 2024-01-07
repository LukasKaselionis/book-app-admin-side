import path from "path";
import { Request } from "express";
import multer, { diskStorage } from "multer";
import fs from "fs";

const ensureUploadsFolderExists = (): void => {
    const uploadsFolderPath: string = path.join(__dirname, "../../uploads");

    if (!fs.existsSync(uploadsFolderPath)) {
        fs.mkdirSync(uploadsFolderPath);
    }
};

ensureUploadsFolderExists();

const storage: multer.StorageEngine = diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, "uploads/");
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
        const ext: string = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

const upload: multer.Multer = multer({
    storage: storage,
    fileFilter: (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
        switch (file.mimetype) {
            case "image/png":
            case "image/jpg":
            case "image/jpeg":
            case "application/epub+zip":
                callback(null, true);
                break;
            default:
                callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
});

export default upload;
