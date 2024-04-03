import { Router } from "express";
import authenticationMiddlewares from "../middlewares/authentication.middlewares";
import { addProperty, check, gettingProperties, hostProperty, searchLoc } from "../controllers/property.controllers";

const router: Router = Router()

router.post("/", authenticationMiddlewares("host"), addProperty)

router.get("/loc", searchLoc)

router.get("/", gettingProperties)

router.get("/search", check)

router.get("/host", authenticationMiddlewares("host"), hostProperty)

export default router