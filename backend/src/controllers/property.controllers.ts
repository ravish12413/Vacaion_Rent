import { Request, Response, NextFunction } from "express";
import { PropertyI } from "../shared/types";
import { PropertyType } from "@prisma/client";
import { propertyCreationValidation } from "../validations/property.validations";
import prisma from "../configs/prismaInstance";

export const addProperty = async (req: Request, res: Response, next: NextFunction) => {
    const { data, id } = req.body;
    try {
        const check = propertyCreationValidation(data);
        if (!check.success) return next({ status: 422, message: `Issue with: ${check.error.issues[0].path[0]}, issue is: ${check.error.issues[0].message}` });
        const newProperty = await prisma.property.create({
            data: { ...data, host_id: id },
            select: { id: true, title: true, host_id: true }
        })
        res.status(200).send({ message: "New Property Added", data: newProperty })
    } catch (err) {
        console.log("post: property/", err);
        next(err);
    }
}

export const searchLoc = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let list = await prisma.property.findMany({
            select: {
                city: true, state: true
            },
            distinct: ['city', 'state']
        })
        res.status(200).send(list);
    } catch (err) {
        console.log("property/loc: ", err);
        next(err);
    }
}

export const gettingProperties = async (req: Request, res: Response, next: NextFunction) => {
    const { location, property_type, end_date, start_date, host, sortByFilter, sortByOrder } = req.query;
    try {
        const locationString = typeof location === 'string' ? location : (typeof location === 'object' && location !== null ? location.toString() : '');
        const city = locationString.split(',')[0];
        const state = locationString.split(',')[1];
        const startDate = new Date(Number(start_date));
        const endDate = new Date(Number(end_date));
        const finalPropertyList = [];
        if (!(city && state && property_type && startDate && endDate)) return next({ status: 404, message: "Missing Attributes" })
        let propertyList;
        if (host) {
            let hostList = await prisma.host.findFirst({
                where: {
                    name: {
                        contains: host?.toString(),
                        mode: "insensitive",
                    }
                },
                select: { id: true }
            });
            propertyList = await prisma.property.findMany({
                where: {
                    city: {
                        contains: city,
                        mode: "insensitive"
                    },
                    host_id: hostList?.id,
                    state: {
                        contains: state,
                        mode: "insensitive"
                    },
                    property_type: property_type?.toString() as PropertyType
                }
            })
        } else {
            propertyList = await prisma.property.findMany({
                where: {
                    city: {
                        contains: city,
                        mode: "insensitive"
                    },
                    state: {
                        contains: state,
                        mode: "insensitive"
                    },
                    property_type: property_type?.toString() as PropertyType
                }
            })
        }
        for (let i = 0; i < propertyList.length; i++) {
            let allBookings = await prisma.booking.findMany({
                where: {
                    property_id: propertyList[i].id,
                    OR: [
                        {
                            AND: [
                                {
                                    start_date: {
                                        lte: new Date(endDate)
                                    }
                                }, {
                                    start_date: {
                                        gte: new Date(startDate)
                                    }
                                }
                            ]
                        },
                        {
                            AND: [
                                {
                                    end_date: {
                                        lte: new Date(endDate)
                                    }
                                },
                                {
                                    end_date: {
                                        gte: new Date(startDate)
                                    }
                                }
                            ]
                        }
                    ]
                },
            })
            if (allBookings.length === 0) {
                finalPropertyList.push(propertyList[i]);
            }
        }
        if (sortByFilter === "PROPERTY_TYPE") {
            if (sortByOrder === "DESCENDING") {
                finalPropertyList.sort((a, b) => b.property_type.localeCompare(a.property_type))
            } else if (sortByOrder === "ASCENDING") {
                finalPropertyList.sort((a, b) => a.property_type.localeCompare(b.property_type))
            }
        } else if (sortByFilter === "LOCATION") {
            if (sortByOrder === "DESCENDING") {
                finalPropertyList.sort((a, b) => b.city.localeCompare(a.city))
            } else if (sortByOrder === "ASCENDING") {
                finalPropertyList.sort((a, b) => a.city.localeCompare(b.city))
            }
        } else if (sortByOrder === "ASCENDING") {
            finalPropertyList.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortByOrder === "DESCENDING") {
            finalPropertyList.sort((a, b) => b.title.localeCompare(a.title));
        }
        res.status(200).send(finalPropertyList);
    } catch (err) {
        console.log("property/", err);
        next(err);
    }
}

export const check = async (req: Request, res: Response, next: NextFunction) => {
    const city = req.query;
    const list = await prisma.property.findMany({
        where: {
            city: {
                contains: city.city?.toString()
            }
        }
    })
    return res.send(list);
}

export const hostProperty = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    try {
        const propertyList: Array<PropertyI> = await prisma.property.findMany({ where: { host_id: id } }) as Array<PropertyI>;
        res.status(200).send(propertyList);
    } catch (err) {
        console.log("property/host: ", err);
        next(err);
    }
}