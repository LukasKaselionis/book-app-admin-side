import express, { Router, Request, Response } from "express";
import AuthController from "../app/Http/Controllers/AuthController";

const router: Router = express.Router();
const authController: AuthController = new AuthController();

router.post("/login", (req: Request, res: Response) => authController.login(req, res));
router.post("/register", (req: Request, res: Response) => authController.register(req, res));
router.put("/set-new-password/:id", (req: Request, res: Response) => authController.setNewPassword(req, res));
router.post("/forgot-password", (req: Request, res: Response) => authController.forgotPassword(req, res));
router.get("/logout", (req: Request, res: Response) => authController.logout(req, res));

export default router;
