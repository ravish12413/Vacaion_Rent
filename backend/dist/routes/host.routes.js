"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_middlewares_1 = __importDefault(require("../middlewares/authentication.middlewares"));
const host_controllers_1 = require("../controllers/host.controllers");
const router = (0, express_1.Router)();
router.post("/signup", host_controllers_1.signup);
router.post("/signin", host_controllers_1.signin);
router.get("/", (0, authentication_middlewares_1.default)("host"), host_controllers_1.hostDetails);
router.patch("/update-host", (0, authentication_middlewares_1.default)("host"), host_controllers_1.updateHost);
exports.default = router;
