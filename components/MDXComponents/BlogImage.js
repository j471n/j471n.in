import NextImage from "next/image";
import { useEffect, useState } from "react";
export default function BlogImage({ src, alt }) {
  const [data, setData] = useState({ h: 0, w: 0 });
  function getMeta(url) {
    let h, w;
    const img = new Image();
    img.addEventListener("load", function () {
      setData({
        h: this.naturalHeight,
        w: this.naturalWidth,
      });
    });
    img.src = url;
  }

  useEffect(() => {
    getMeta(src);
  }, [getMeta, src]);

  return (
    <div className="relative w-full ">
      <NextImage
        className="rounded-lg"
        src={src}
        alt={alt}
        width={data.w}
        height={data.h}
        // layout="fill"
        objectFit="contain"
        quality={75}
        layout="responsive"
      />
    </div>
  );
}
