import express, { Router, Request, Response } from "express";
import { JWTMiddleware } from "../app/Middleware/JWTMiddleware";
import AuthController from "../app/Http/Controllers/AuthController";
import BookController from "../app/Http/Controllers/BookController";

const router: Router = express.Router();
const authController: AuthController = new AuthController();
const bookController: BookController = new BookController();

router.post("/login", (req: Request, res: Response) => authController.login(req, res));
router.post("/register", (req: Request, res: Response) => authController.register(req, res));
router.put("/set-new-password/:id", (req: Request, res: Response) => authController.setNewPassword(req, res));
router.post("/forgot-password", (req: Request, res: Response) => authController.forgotPassword(req, res));
router.get("/logout", (req: Request, res: Response) => authController.logout(req, res));

// AAuthorization routes
router.get("/book", JWTMiddleware, (req: Request, res: Response) => bookController.getAll(req, res));
router.post("/book", JWTMiddleware, (req: Request, res: Response) => bookController.create(req, res));
router.put("/book/:id", JWTMiddleware, (req: Request, res: Response) => bookController.update(req, res));
router.delete("/book/:id", JWTMiddleware, (req: Request, res: Response) => bookController.delete(req, res));

export default router;
