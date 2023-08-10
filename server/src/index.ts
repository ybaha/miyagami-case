import express, { Application, Request, Response } from "express";
import { parseStringPromise } from "xml2js";
import "dotenv/config";
import router from "./routes";
import bodyParser from "body-parser";
import cors from "cors";

const app: Application = express();

const PORT = 3001;

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log("Server is running on:", PORT, "\n");
});
