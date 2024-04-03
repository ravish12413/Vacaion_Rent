import { Request, Response, NextFunction } from "express";
import { HostRegisterI, LoginCredentialsI } from "../shared/types";
import { compare, hash } from "bcrypt";
import { hostLoginCredentials, hostRegisterCredentials } from "../validations/host.validations";
import { sign } from "jsonwebtoken";
import prisma from "../configs/prismaInstance";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, about }: HostRegisterI = req.body;
    const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
    try {
        const check = hostRegisterCredentials({ name, email, password, about });
        if (!check.success) return next({ status: 422, message: "Invalid Input" });
        const hostExists = await prisma.host.findUnique({ where: { email } })
        if (hostExists) return next({ status: 409, message: "Host Already Exists" })
        const hashed_password: string = await hash(password, SALT_ROUNDS);
        const newHost = await prisma.host.create({ data: { name, email, about, password: hashed_password }, select: { id: true, email: true, name: true } });
        res.status(200).send({ message: "New Host Created" })
    } catch (err) {
        console.log("host/signup: ", err)
        next(err);
    }
}

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: LoginCredentialsI = req.body;
    const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY ?? "";
    try {
        const check = hostLoginCredentials({ email, password });
        if (!check.success) return next({ status: 422, message: "Invalid Input" });
        const hostDetails = await prisma.host.findUnique({ where: { email } });
        if (!hostDetails) return next({ status: 404, message: "Host Doesn't Exists" });
        const result = await compare(password, hostDetails.password);
        if (!result) return next({ status: 422, message: "Wrong Password" });
        const token: string = sign({ id: hostDetails.id }, JWT_SECRET_KEY, { expiresIn: "72h" });
        res.status(200).send({ message: "Login Successful", token });
    } catch (err) {
        console.log("host/signin: ", err)
        next(err);
    }
}

export const hostDetails = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    try {
        const hostDetails = await prisma.host.findUnique({ where: { id }, select: { email: true, name: true, status: true, about: true } });
        res.status(200).send(hostDetails);
    } catch (err) {
        next(err);
    }
}

export const updateHost = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    const updatedHostDetails = req.body.data;
    try {
        if (!updatedHostDetails) return next({ status: 409, message: "Cannot find new details" })
        const hostDetails = await prisma.host.update({ where: { id }, data: { ...updatedHostDetails }, select: { email: true, name: true, status: true, about: true } })
        res.status(200).send({ message: "Host Details Updated", data: hostDetails });
    } catch (err) {
        console.log("host/update-host", err);
        next(err);
    }
}