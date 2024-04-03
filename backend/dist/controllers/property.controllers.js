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
exports.hostProperty = exports.check = exports.gettingProperties = exports.searchLoc = exports.addProperty = void 0;
const property_validations_1 = require("../validations/property.validations");
const prismaInstance_1 = __importDefault(require("../configs/prismaInstance"));
const addProperty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, id } = req.body;
    try {
        const check = (0, property_validations_1.propertyCreationValidation)(data);
        if (!check.success)
            return next({ status: 422, message: `Issue with: ${check.error.issues[0].path[0]}, issue is: ${check.error.issues[0].message}` });
        const newProperty = yield prismaInstance_1.default.property.create({
            data: Object.assign(Object.assign({}, data), { host_id: id }),
            select: { id: true, title: true, host_id: true }
        });
        res.status(200).send({ message: "New Property Added", data: newProperty });
    }
    catch (err) {
        console.log("post: property/", err);
        next(err);
    }
});
exports.addProperty = addProperty;
const searchLoc = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let list = yield prismaInstance_1.default.property.findMany({
            select: {
                city: true, state: true
            },
            distinct: ['city', 'state']
        });
        res.status(200).send(list);
    }
    catch (err) {
        console.log("property/loc: ", err);
        next(err);
    }
});
exports.searchLoc = searchLoc;
const gettingProperties = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { location, property_type, end_date, start_date, host, sortByFilter, sortByOrder } = req.query;
    try {
        const locationString = typeof location === 'string' ? location : (typeof location === 'object' && location !== null ? location.toString() : '');
        const city = locationString.split(',')[0];
        const state = locationString.split(',')[1];
        const startDate = new Date(Number(start_date));
        const endDate = new Date(Number(end_date));
        const finalPropertyList = [];
        if (!(city && state && property_type && startDate && endDate))
            return next({ status: 404, message: "Missing Attributes" });
        let propertyList;
        if (host) {
            let hostList = yield prismaInstance_1.default.host.findFirst({
                where: {
                    name: {
                        contains: host === null || host === void 0 ? void 0 : host.toString(),
                        mode: "insensitive",
                    }
                },
                select: { id: true }
            });
            propertyList = yield prismaInstance_1.default.property.findMany({
                where: {
                    city: {
                        contains: city,
                        mode: "insensitive"
                    },
                    host_id: hostList === null || hostList === void 0 ? void 0 : hostList.id,
                    state: {
                        contains: state,
                        mode: "insensitive"
                    },
                    property_type: property_type === null || property_type === void 0 ? void 0 : property_type.toString()
                }
            });
        }
        else {
            propertyList = yield prismaInstance_1.default.property.findMany({
                where: {
                    city: {
                        contains: city,
                        mode: "insensitive"
                    },
                    state: {
                        contains: state,
                        mode: "insensitive"
                    },
                    property_type: property_type === null || property_type === void 0 ? void 0 : property_type.toString()
                }
            });
        }
        for (let i = 0; i < propertyList.length; i++) {
            let allBookings = yield prismaInstance_1.default.booking.findMany({
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
            });
            if (allBookings.length === 0) {
                finalPropertyList.push(propertyList[i]);
            }
        }
        if (sortByFilter === "PROPERTY_TYPE") {
            if (sortByOrder === "DESCENDING") {
                finalPropertyList.sort((a, b) => b.property_type.localeCompare(a.property_type));
            }
            else if (sortByOrder === "ASCENDING") {
                finalPropertyList.sort((a, b) => a.property_type.localeCompare(b.property_type));
            }
        }
        else if (sortByFilter === "LOCATION") {
            if (sortByOrder === "DESCENDING") {
                finalPropertyList.sort((a, b) => b.city.localeCompare(a.city));
            }
            else if (sortByOrder === "ASCENDING") {
                finalPropertyList.sort((a, b) => a.city.localeCompare(b.city));
            }
        }
        else if (sortByOrder === "ASCENDING") {
            finalPropertyList.sort((a, b) => a.title.localeCompare(b.title));
        }
        else if (sortByOrder === "DESCENDING") {
            finalPropertyList.sort((a, b) => b.title.localeCompare(a.title));
        }
        res.status(200).send(finalPropertyList);
    }
    catch (err) {
        console.log("property/", err);
        next(err);
    }
});
exports.gettingProperties = gettingProperties;
const check = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const city = req.query;
    const list = yield prismaInstance_1.default.property.findMany({
        where: {
            city: {
                contains: (_a = city.city) === null || _a === void 0 ? void 0 : _a.toString()
            }
        }
    });
    return res.send(list);
});
exports.check = check;
const hostProperty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const propertyList = yield prismaInstance_1.default.property.findMany({ where: { host_id: id } });
        res.status(200).send(propertyList);
    }
    catch (err) {
        console.log("property/host: ", err);
        next(err);
    }
});
exports.hostProperty = hostProperty;
