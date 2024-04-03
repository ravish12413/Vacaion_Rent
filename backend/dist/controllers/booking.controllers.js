"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hostBooking = exports.addBooking = void 0;
const prismaInstance_1 = __importDefault(require("../configs/prismaInstance"));
const addBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { property_id, start_date, end_date } = req.body.data;
    const { id } = req.body;
    try {
        yield prismaInstance_1.default.booking.create({ data: { property_id, guest_id: id, start_date: new Date(start_date), end_date: new Date(end_date) } });
        res.status(201).send({ message: "Booking Confirmed" });
    }
    catch (err) {
        next(err);
    }
});
exports.addBooking = addBooking;
const hostBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const bookedProperties = yield prismaInstance_1.default.property.findMany({
            where: {
                host_id: id
            },
            select: {
                id: true
            }
        });
        const bookedPropertyIds = bookedProperties.map(property => property.id);
        const bookingsForHost = yield prismaInstance_1.default.booking.findMany({
            where: {
                property_id: {
                    in: bookedPropertyIds
                }
            },
            include: {
                property: true
            }
        });
        res.status(200).send(bookingsForHost);
    }
    catch (err) {
        next(err);
    }
});
exports.hostBooking = hostBooking;
