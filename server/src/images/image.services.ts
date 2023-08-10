import axios from "axios";
import { Img } from "./image.model";

const url = `https://www.flickr.com/services/feeds/photos_public.gne`;

// Function to fetch images from Flickr API
const fetchImages = async (tags: string): Promise<Img[]> => {
  try {
    const response = await axios.get(url, {
      params: {
        tags: tags,
        format: "json",
        // nojsoncallback is used to remove the callback function from the json response
        nojsoncallback: true,
      },
    });

    const images: Img[] =
      response.data.items.map((image: any) => ({
        title: image.title,
        // Filtering out the _m from the end of the link to get a bigger version of the image
        link: image.media.m.slice(0, -6) + ".jpg",
        published: image.published,
      })) || [];

    return images;
  } catch (error) {
    console.log(error);
    return [] as Img[];
  }
};

export default fetchImages;
