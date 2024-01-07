import path from "path";
import { Request } from "express";
import multer, { diskStorage } from "multer";

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
