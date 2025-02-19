import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

interface FallbackImageProps extends ImageProps {
  fallbackSrc: string;
}

const ImageWithFallback = (props: FallbackImageProps) => {
  const { src, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default ImageWithFallback;
