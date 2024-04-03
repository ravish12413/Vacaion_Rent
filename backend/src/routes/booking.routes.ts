import { Router } from "express";
import authenticationMiddlewares from "../middlewares/authentication.middlewares";
import { addBooking, hostBooking } from "../controllers/booking.controllers";

const router: Router = Router()

router.post("/add-booking", authenticationMiddlewares("guest"), addBooking)

router.get("/host", authenticationMiddlewares("host"), hostBooking)

export default router