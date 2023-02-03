import Image from "next/image";
import { Guide } from "../../constants/guide";

export default function SupportItem({ text, image, id }: Guide) {
  const imageUrl = require(`../../assets/${image}`);
  return (
    <div className="w-full flex justify-center items-center">
      <div>
        <div className="p-4 flex justify-center items-center bg-cardBg-light dark:bg-cardBg-dark rounded-lg transition-all duration-300">
          <div className="rounded-lg overflow-hidden">
            <Image className="scale-105" src={imageUrl} alt={image} />
          </div>
        </div>
        <div className="flex mt-5 items-start">
          <h1 className="text-xl mt-1 mr-1 h-full block">{id}.</h1>

          <div className="text-sm ml-2">
            {text.map((item, index) => (
              <p key={index} className="text-sm mt-2">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
