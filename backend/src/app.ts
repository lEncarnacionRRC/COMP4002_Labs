import express from "express";
import type { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";

console.log("Trying deployment trigger");
dotenv.config();

import corsOptions from "../config/cors";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import errorHandler from "./api/v1/middleware/errorHandler";

const app: Express = express();

app.use(morgan("combined"));

app.use(express.json());

app.use(cors(corsOptions));

app.get("/",  (_req, res) => {
    res.send("Got response from backend!");
});

app.use("/api/v1", employeeRoutes);


app.use(errorHandler);



export default app;