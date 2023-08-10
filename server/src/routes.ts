import { Router } from "express";
import imagesRouter from "./images/image.controller";

const router = Router();

// use routes under /api
// any other routes can be added here.
router.use("/images", imagesRouter);

export default router;
