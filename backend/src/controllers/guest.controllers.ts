import { Request, Response, NextFunction } from "express";
import { GuestRegisterI, LoginCredentialsI } from "../shared/types";
import { guestLoginCredentials, guestRegisterCredentials } from "../validations/guest.validations";
import prisma from "../configs/prismaInstance";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, gender, dob, bio }: GuestRegisterI = req.body;
    const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
    try {
        const check = guestRegisterCredentials({ name, email, password, gender, dob: new Date(dob), bio });
        if (!check.success) return next({ status: 422, message: `Issue with: ${check.error.issues[0].path[0]}, issue is: ${check.error.issues[0].message}` });
        const guestExists = await prisma.guest.findUnique({ where: { email } });
        if (guestExists) return next({ status: 409, message: "Guest Already Exists" });
        const hashed_password: string = await hash(password, SALT_ROUNDS);
        const newGuest = await prisma.guest.create({ data: { name, email, password: hashed_password, gender, dob: new Date(dob), bio } })
        res.status(200).send({ message: "New Guest Created" });
    } catch (err) {
        console.log("guest/signup: ", err);
        next(err);
    }
}

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: LoginCredentialsI = req.body;
    const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY ?? "";
    try {
        const check = guestLoginCredentials({ email, password });
        if (!check.success) return next({ status: 422, message: "Invalid Input" });
        const guestDetails = await prisma.guest.findUnique({ where: { email } });
        if (!guestDetails) return next({ status: 404, message: "Guest Doesn't Exists" });
        const result = await compare(password, guestDetails.password);
        if (!result) return next({ status: 422, message: "Wrong Password" });
        const token: string = sign({ id: guestDetails.id }, JWT_SECRET_KEY, { expiresIn: "72h" });
        res.status(200).send({ message: "Login Successful", token });
    } catch (err) {
        console.log("guest/signin: ", err);
        next(err);
    }
}
