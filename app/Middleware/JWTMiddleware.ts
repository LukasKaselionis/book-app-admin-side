import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

const secretOrPrivateKey: string = process.env.JWT_SECRET_KEY || "defaultSecret";

export const JWTMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        res.status(401).json({ message: "Unauthorized: Missing token" });

        return;
    }


    const [bearer, token] = authHeader.split(" ");

    if (!bearer || !token || bearer.toLowerCase() !== "bearer") {
        res.status(401).json({ message: "Unauthorized: Invalid token format" });

        return;
    }

    jwt.verify(token, secretOrPrivateKey, (err: VerifyErrors | null) => {
        if (err) {
            res.status(403).json({ message: "Forbidden: Invalid token" });

            return;
        }
        next();
    });
};
