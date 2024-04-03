import { Router } from "express";
import authenticationMiddlewares from "../middlewares/authentication.middlewares";
import { hostDetails, signin, signup, updateHost } from "../controllers/host.controllers";

const router: Router = Router()

router.post("/signup", signup)

router.post("/signin", signin)

router.get("/", authenticationMiddlewares("host"), hostDetails)

router.patch("/update-host", authenticationMiddlewares("host"), updateHost)

export default router