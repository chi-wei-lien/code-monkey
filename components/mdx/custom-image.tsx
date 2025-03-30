import Image from "next/image";

interface CustomImageProps {
  src: string;
  alt: string;
  width: number;
  height?: number;
  caption?: string;
}

const CustomImage = ({
  src,
  alt,
  width,
  height,
  caption,
}: CustomImageProps) => {
  return (
    <div className="flex justify-center">
      <figure>
        <div className="rounded-md border-2 border-dashed border-themeBrown">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="m-0 rounded-md"
          />
        </div>
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </div>
  );
};

export default CustomImage;
