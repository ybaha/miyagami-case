import express from "express";
import axios from "axios";
import { parseStringPromise } from "xml2js";

const imagesRouter = express.Router();
const url = `https://www.flickr.com/services/feeds/photos_public.gne`;

type Img = {
  title: string;
  link: string;
  published: string;
};

imagesRouter.get("/", async (req, res) => {
  const tags = req.query.tags;

  const response = await axios.get(url, {
    params: {
      tags: tags,
      format: "json",
      nojsoncallback: true,
    },
  });

  const images: Img[] =
    response.data.items.map((image: any) => ({
      title: image.title,
      link: image.media.m.slice(0, -6) + ".jpg",
      published: image.published,
    })) || [];

  return res.send(images);
});

export default imagesRouter;
