import {Request, Response} from "express";

export default class Authorization {
    static login(req: Request, res: Response): void {
        console.log("login");
        res.send("login");
    }

    static logout(req: Request, res: Response): void {
        console.log("logout");
        res.send("logout");
    }
}
