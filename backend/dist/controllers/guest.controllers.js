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
exports.signin = exports.signup = void 0;
const guest_validations_1 = require("../validations/guest.validations");
const prismaInstance_1 = __importDefault(require("../configs/prismaInstance"));
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, gender, dob, bio } = req.body;
    const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
    try {
        const check = (0, guest_validations_1.guestRegisterCredentials)({ name, email, password, gender, dob: new Date(dob), bio });
        if (!check.success)
            return next({ status: 422, message: `Issue with: ${check.error.issues[0].path[0]}, issue is: ${check.error.issues[0].message}` });
        const guestExists = yield prismaInstance_1.default.guest.findUnique({ where: { email } });
        if (guestExists)
            return next({ status: 409, message: "Guest Already Exists" });
        const hashed_password = yield (0, bcrypt_1.hash)(password, SALT_ROUNDS);
        const newGuest = yield prismaInstance_1.default.guest.create({ data: { name, email, password: hashed_password, gender, dob: new Date(dob), bio } });
        res.status(200).send({ message: "New Guest Created" });
    }
    catch (err) {
        console.log("guest/signup: ", err);
        next(err);
    }
});
exports.signup = signup;
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password } = req.body;
    const JWT_SECRET_KEY = (_a = process.env.JWT_SECRET_KEY) !== null && _a !== void 0 ? _a : "";
    try {
        const check = (0, guest_validations_1.guestLoginCredentials)({ email, password });
        if (!check.success)
            return next({ status: 422, message: "Invalid Input" });
        const guestDetails = yield prismaInstance_1.default.guest.findUnique({ where: { email } });
        if (!guestDetails)
            return next({ status: 404, message: "Guest Doesn't Exists" });
        const result = yield (0, bcrypt_1.compare)(password, guestDetails.password);
        if (!result)
            return next({ status: 422, message: "Wrong Password" });
        const token = (0, jsonwebtoken_1.sign)({ id: guestDetails.id }, JWT_SECRET_KEY, { expiresIn: "72h" });
        res.status(200).send({ message: "Login Successful", token });
    }
    catch (err) {
        console.log("guest/signin: ", err);
        next(err);
    }
});
exports.signin = signin;
