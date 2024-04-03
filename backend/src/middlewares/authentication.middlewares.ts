import { Request, Response, NextFunction } from "express"
import { JwtPayload, verify } from "jsonwebtoken";
import prisma from "../configs/prismaInstance";

const authenticationMiddlewares = (role: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token: string = req.headers.authorization ?? "";
        if (!token) return res.status(404).send({ Error: "Token not found" })
        const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY ?? "";
        if (!JWT_SECRET_KEY) return res.status(500).send({ message: "Something went wrong!!!" });
        try {
            const decode: JwtPayload | string = verify(token, JWT_SECRET_KEY) ?? "";
            if (typeof decode !== "string") {
                const id: string = decode.id;
                if (role === "host") {
                    const isHost = await prisma.host.findUnique({ where: { id } })
                    req.body.id = id
                    if (isHost) return next();
                    return res.status(500).send({ message: "You are not authorized to make this request" });
                } else if (role === "guest") {
                    req.body.id = id
                    const isGuest = await prisma.guest.findUnique({ where: { id } });
                    if (isGuest) return next();
                    return res.status(500).send({ message: "You are not authorized to make this request" });
                }
            }
            res.status(500).send({ message: "Something went  wrong!!!" })
        } catch (err) {
            console.log("authentication Middleware: ", err);
            res.status(500).send({ message: "Something went wrong!!!" })
        }
    }
}

export default authenticationMiddlewares