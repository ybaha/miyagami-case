import { Router } from "express";
import imagesRouter from "./images/images.routes";

const router = Router();

router.use("/images", imagesRouter);

export default router;
