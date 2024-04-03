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
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const guest_routes_1 = __importDefault(require("./routes/guest.routes"));
const host_routes_1 = __importDefault(require("./routes/host.routes"));
const property_routes_1 = __importDefault(require("./routes/property.routes"));
const booking_routes_1 = __importDefault(require("./routes/booking.routes"));
(0, dotenv_1.config)();
const PORT = Number(process.env.PORT);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send({ message: "Welcome to Vacation Rental Platform" });
}));
app.use("/host", host_routes_1.default);
app.use("/guest", guest_routes_1.default);
app.use("/property", property_routes_1.default);
app.use("/booking", booking_routes_1.default);
app.use("/*", (req, res, next) => {
    next({ status: 404, message: 'Page not found' });
});
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        Error: err.message
    });
};
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}/`);
});
