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
exports.updateHost = exports.hostDetails = exports.signin = exports.signup = void 0;
const bcrypt_1 = require("bcrypt");
const host_validations_1 = require("../validations/host.validations");
const jsonwebtoken_1 = require("jsonwebtoken");
const prismaInstance_1 = __importDefault(require("../configs/prismaInstance"));
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, about } = req.body;
    const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
    try {
        const check = (0, host_validations_1.hostRegisterCredentials)({ name, email, password, about });
        if (!check.success)
            return next({ status: 422, message: "Invalid Input" });
        const hostExists = yield prismaInstance_1.default.host.findUnique({ where: { email } });
        if (hostExists)
            return next({ status: 409, message: "Host Already Exists" });
        const hashed_password = yield (0, bcrypt_1.hash)(password, SALT_ROUNDS);
        const newHost = yield prismaInstance_1.default.host.create({ data: { name, email, about, password: hashed_password }, select: { id: true, email: true, name: true } });
        res.status(200).send({ message: "New Host Created" });
    }
    catch (err) {
        console.log("host/signup: ", err);
        next(err);
    }
});
exports.signup = signup;
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password } = req.body;
    const JWT_SECRET_KEY = (_a = process.env.JWT_SECRET_KEY) !== null && _a !== void 0 ? _a : "";
    try {
        const check = (0, host_validations_1.hostLoginCredentials)({ email, password });
        if (!check.success)
            return next({ status: 422, message: "Invalid Input" });
        const hostDetails = yield prismaInstance_1.default.host.findUnique({ where: { email } });
        if (!hostDetails)
            return next({ status: 404, message: "Host Doesn't Exists" });
        const result = yield (0, bcrypt_1.compare)(password, hostDetails.password);
        if (!result)
            return next({ status: 422, message: "Wrong Password" });
        const token = (0, jsonwebtoken_1.sign)({ id: hostDetails.id }, JWT_SECRET_KEY, { expiresIn: "72h" });
        res.status(200).send({ message: "Login Successful", token });
    }
    catch (err) {
        console.log("host/signin: ", err);
        next(err);
    }
});
exports.signin = signin;
const hostDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const hostDetails = yield prismaInstance_1.default.host.findUnique({ where: { id }, select: { email: true, name: true, status: true, about: true } });
        res.status(200).send(hostDetails);
    }
    catch (err) {
        next(err);
    }
});
exports.hostDetails = hostDetails;
const updateHost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const updatedHostDetails = req.body.data;
    try {
        if (!updatedHostDetails)
            return next({ status: 409, message: "Cannot find new details" });
        const hostDetails = yield prismaInstance_1.default.host.update({ where: { id }, data: Object.assign({}, updatedHostDetails), select: { email: true, name: true, status: true, about: true } });
        res.status(200).send({ message: "Host Details Updated", data: hostDetails });
    }
    catch (err) {
        console.log("host/update-host", err);
        next(err);
    }
});
exports.updateHost = updateHost;
