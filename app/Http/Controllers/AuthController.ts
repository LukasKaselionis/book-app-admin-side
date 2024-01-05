import { Request, Response } from "express";

export default class AuthController {
    public login(req: Request, res: Response): void {
        console.log("login");
        res.send("login");
    }

    public register(req: Request, res: Response): void {
        console.log("register");
        res.send("register");
    }

    public setNewPassword(req: Request, res: Response): void {
        console.log("password");
        res.send("password");
    }

    public logout(req: Request, res: Response): void {
        console.log("logout");
        res.send("logout");
    }
}
