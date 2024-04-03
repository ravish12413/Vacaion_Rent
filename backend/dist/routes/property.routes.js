"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_middlewares_1 = __importDefault(require("../middlewares/authentication.middlewares"));
const property_controllers_1 = require("../controllers/property.controllers");
const router = (0, express_1.Router)();
router.post("/", (0, authentication_middlewares_1.default)("host"), property_controllers_1.addProperty);
router.get("/loc", property_controllers_1.searchLoc);
router.get("/", property_controllers_1.gettingProperties);
router.get("/search", property_controllers_1.check);
router.get("/host", (0, authentication_middlewares_1.default)("host"), property_controllers_1.hostProperty);
exports.default = router;
