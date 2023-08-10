import express from "express";
import fetchImages from "./image.services";

const imagesRouter = express.Router();

imagesRouter.get("/", async (req, res) => {
  const tags = req.query.tags;
  // Call the fetchImages function to get images
  const images = await fetchImages(tags as string);
  return res.send(images);
});

export default imagesRouter;
