import Image from "next/image"
import { Guide } from "../../constants/guide"

export default function SupportItem({
    text,
    image,
}: Guide){
    const  imageUrl =  require(`../../assets/${image}`)
    return (
        <div className="w-full flex justify-center items-center">
            <div>
                <div className="p-4 flex justify-center items-center bg-cardBg-light dark:bg-cardBg-dark rounded-lg">
                    <div className="rounded-lg overflow-hidden">
                        <Image className="scale-105" src={imageUrl} alt={image} />
                    </div>
                </div>
                <div className="text-sm mt-5 ml-2">
                    {
                        text.map((item, index) => (
                            <p key={index} className="text-sm mt-2">{item}</p>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}