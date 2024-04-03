"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestLoginCredentials = exports.guestRegisterCredentials = void 0;
const zod_1 = __importDefault(require("zod"));
const guestRegisterCredentials = (obj) => {
    const schema = zod_1.default.object({
        name: zod_1.default.string(),
        email: zod_1.default.string().email(),
        password: zod_1.default.string().min(8),
        gender: zod_1.default.string(),
        dob: zod_1.default.coerce.date(),
        bio: zod_1.default.string()
    });
    const response = schema.safeParse(obj);
    return response;
};
exports.guestRegisterCredentials = guestRegisterCredentials;
const guestLoginCredentials = (obj) => {
    const schema = zod_1.default.object({
        email: zod_1.default.string().email(),
        password: zod_1.default.string().min(8)
    });
    const response = schema.safeParse(obj);
    return response;
};
exports.guestLoginCredentials = guestLoginCredentials;
