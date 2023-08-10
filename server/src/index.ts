import express, { Application } from "express";
import "dotenv/config";
import router from "./routes";
import cors from "cors";
// Used MVC pattern for potential future scalability,
// even though it was an overkill for this project

const app: Application = express();
const PORT = 3001;

// disable cors
app.use(cors());

// use routes under /api
// this way we can add versioning to our API in future if needed
app.use("/api", router);

app.listen(PORT, () => {
  console.log("Server is running on:", PORT, "\n");
});
