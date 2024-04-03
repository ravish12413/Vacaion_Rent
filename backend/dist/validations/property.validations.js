"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyCreationValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const propertyCreationValidation = (obj) => {
    const schema = zod_1.default.object({
        title: zod_1.default.string(),
        city: zod_1.default.string(),
        state: zod_1.default.string(),
        address: zod_1.default.string(),
        img_url: zod_1.default.string().url(),
        pincode: zod_1.default.string().max(6).min(6),
        property_type: zod_1.default.string()
    });
    const response = schema.safeParse(obj);
    return response;
};
exports.propertyCreationValidation = propertyCreationValidation;
