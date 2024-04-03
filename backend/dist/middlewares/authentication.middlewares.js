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
const jsonwebtoken_1 = require("jsonwebtoken");
const prismaInstance_1 = __importDefault(require("../configs/prismaInstance"));
const authenticationMiddlewares = (role) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        const token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : "";
        if (!token)
            return res.status(404).send({ Error: "Token not found" });
        const JWT_SECRET_KEY = (_b = process.env.JWT_SECRET_KEY) !== null && _b !== void 0 ? _b : "";
        if (!JWT_SECRET_KEY)
            return res.status(500).send({ message: "Something went wrong!!!" });
        try {
            const decode = (_c = (0, jsonwebtoken_1.verify)(token, JWT_SECRET_KEY)) !== null && _c !== void 0 ? _c : "";
            if (typeof decode !== "string") {
                const id = decode.id;
                if (role === "host") {
                    const isHost = yield prismaInstance_1.default.host.findUnique({ where: { id } });
                    req.body.id = id;
                    if (isHost)
                        return next();
                    return res.status(500).send({ message: "You are not authorized to make this request" });
                }
                else if (role === "guest") {
                    req.body.id = id;
                    const isGuest = yield prismaInstance_1.default.guest.findUnique({ where: { id } });
                    if (isGuest)
                        return next();
                    return res.status(500).send({ message: "You are not authorized to make this request" });
                }
            }
            res.status(500).send({ message: "Something went  wrong!!!" });
        }
        catch (err) {
            console.log("authentication Middleware: ", err);
            res.status(500).send({ message: "Something went wrong!!!" });
        }
    });
};
exports.default = authenticationMiddlewares;
