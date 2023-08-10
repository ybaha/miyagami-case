import { useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { api } from "@/lib/api";

const inter = Inter({ subsets: ["latin"] });

type Img = {
  title: string;
  link: string;
  published: string;
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<Img[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchImages(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    setLoading(true);

    try {
      const res = await api.get("/images", {
        params: {
          // split query by space and join with comma and pass to api
          tags: query.split(" ").join(","),
        },
      });
      const images = res.data as Img[];
      setImages(images);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  // fetch images on mount
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-2 sm:p-24 ${inter.className}`}
    >
      {/* Used form for better accessibility */}
      <form
        className="flex items-center flex-col justify-center pt-16"
        onSubmit={(e) => fetchImages(e)}
      >
        <h1 className="font-extrabold text-transparent text-4xl md:text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center py-2">
          Flickr Public Images
        </h1>
        <div className="flex w-full sm:w-[400px] gap-2 mt-8">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="Photos, people, or groups"
            className="flex bg-transparent border-slate-700 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          ></input>
          <button
            type="submit"
            className="bg-slate-700 h-10 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Search
          </button>
        </div>
      </form>
      {loading && <div className="mt-16 ">Loading...</div>}
      {images.length === 0 && !loading && (
        <div className="mt-16 ">No images found</div>
      )}
      <section className="sm:columns-2 w-auto max-w-8xl mt-8 md:columns-3 lg:columns-4 gap-8 [column-fill:_balance] box-border mx-auto ">
        {images.map((image, idx) => (
          <div
            className="group relative mb-8 flex flex-col items-center justify-center flex-nowrap hover:cursor-pointer"
            key={idx}
            onClick={() => window.open(image.link, "_blank")}
          >
            <Image
              src={image.link}
              alt={image.title}
              width={300}
              height={300}
              className="rounded-md"
            />
            {/* Overlay */}
            <div className="group-hover:block hidden bg-gradient-to-b from-transparent to-black/70 absolute w-full h-full"></div>

            <div className="group-hover:flex flex-col absolute w-full overflow-clip hidden bottom-0 text-sm mt-2">
              <span className="text-slate-200">
                {new Date(image.published).toLocaleDateString() || ""}
              </span>
              <span>{image.title || "No title"}</span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
