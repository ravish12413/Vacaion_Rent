import express, { ErrorRequestHandler, Request, Response, NextFunction, Application } from "express";
import { config } from "dotenv";
import cors from "cors";
import guestRouter from "./routes/guest.routes"
import hostRouter from "./routes/host.routes"
import propertyRouter from "./routes/property.routes"
import bookingRouter from "./routes/booking.routes"

config();

const PORT: Number = Number(process.env.PORT);

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ message: "Welcome to Vacation Rental Platform" });
})

app.use("/host", hostRouter);

app.use("/guest", guestRouter);

app.use("/property", propertyRouter);

app.use("/booking", bookingRouter);

app.use("/*", (req: Request, res: Response, next: NextFunction) => {
    next({ status: 404, message: 'Page not found' })
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        Error: err.message
    })
}

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}/`)
})