"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_middlewares_1 = __importDefault(require("../middlewares/authentication.middlewares"));
const booking_controllers_1 = require("../controllers/booking.controllers");
const router = (0, express_1.Router)();
router.post("/add-booking", (0, authentication_middlewares_1.default)("guest"), booking_controllers_1.addBooking);
router.get("/host", (0, authentication_middlewares_1.default)("host"), booking_controllers_1.hostBooking);
exports.default = router;
