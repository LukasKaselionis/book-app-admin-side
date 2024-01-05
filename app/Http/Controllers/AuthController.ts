import { Request, Response } from "express";
import { User } from "../../Models/UserScema";

export default class AuthController {
    public login(req: Request, res: Response): void {
        res.send("login");
    }

    public async register(req: Request, res: Response): Promise<void> {
        try {
            const { firstName, lastName, email } = req.body;
            if (!firstName || !lastName || !email) {
                res.status(400).json({ message: "Missing required fields" });

                return;
            }

            const user = new User({
                firstName,
                lastName,
                email,
                password: null
            });

            await user.save();

            res.status(201).json({
                message: "User created successfully! Check email!"
            });
            // TODO: After success user create, need send email were user can set new password
        } catch (error) {
            res.status(500).json({
                message: "An error occurred during registration",
            });
        }
    }

    public setNewPassword(req: Request, res: Response): void {
        res.send("password");
    }

    public logout(req: Request, res: Response): void {
        res.send("logout");
    }
}
