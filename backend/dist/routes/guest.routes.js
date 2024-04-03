"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const guest_controllers_1 = require("../controllers/guest.controllers");
const router = (0, express_1.Router)();
router.post("/signup", guest_controllers_1.signup);
router.post("/signin", guest_controllers_1.signin);
exports.default = router;
