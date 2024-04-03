import prisma from "../configs/prismaInstance";
import { Request, Response, NextFunction } from "express";

export const addBooking = async (req: Request, res: Response, next: NextFunction) => {
    const { property_id, start_date, end_date } = req.body.data;
    const { id } = req.body;
    try {
        await prisma.booking.create({ data: { property_id, guest_id: id, start_date: new Date(start_date), end_date: new Date(end_date) } })
        res.status(201).send({ message: "Booking Confirmed" });
    } catch (err) {
        next(err);
    }
}

export const hostBooking = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    try {
        const bookedProperties = await prisma.property.findMany({
            where: {
                host_id: id
            },
            select: {
                id: true
            }
        });

        const bookedPropertyIds = bookedProperties.map(property => property.id);

        const bookingsForHost = await prisma.booking.findMany({
            where: {
                property_id: {
                    in: bookedPropertyIds
                }
            },
            include: {
                property: true
            }
        });
        res.status(200).send(bookingsForHost)
    } catch (err) {
        next(err);
    }
}