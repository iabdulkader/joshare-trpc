"use client"

import QRCode from "react-qr-code";
import {FiCopy, FiFacebook} from 'react-icons/fi';
import toast from "react-hot-toast";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { useContext } from "react";
import { UserContext } from "../../context/userContext/userContext";

export default function SharePage() {
    const { pin } = useContext(UserContext);

    const link = `${process.env.NEXT_PUBLIC_CLIENT_URL}/files/${pin}`;
    
    const whatsAppLink: string = `https://api.whatsapp.com/send?text=Get My Files here. ${link}`;
    const telegramLink: string = `https://telegram.me/share/url?url=${link}&text=Get My Files Here.`;
    const fbLink: string = `https://www.facebook.com/sharer/sharer.php?u=${link}&quote=Get my files here.`
    const emailLink: string = `mailto:?subject=Get My Files Here&body= Hello, Get my files here ${link}`;

    const copy = () => {
        navigator.clipboard.writeText(link)
        toast.success("Copied")
      }

    return (
       <div className="bg-secondaryBg-light w-full px-8 py-16 flex flex-col items-center text-slate-800 rounded-lg shadow-lg">
           <div>
                <QRCode 
                value={link}
                size={128}
                 />
           </div>

            <div className="w-full mt-4 flex items-center justify-center">
               <input 
                    type="text" 
                    value={link} 
                    className="w-full min-w-[250px] bg-transparent outline-none border-none px-3 py-2 text-[13px]"
                    readOnly 
                />

               <FiCopy onClick={copy} />
            </div>

            <div>
              <h3 className="font-bold text-2xl mt-4 mb-2">Share <span className="dot">.</span></h3>
            </div>

            <div className="flex justify-between gap-8 mt-5 text-2xl">
              <div className="">
                <a href={whatsAppLink} target="_blank" rel="noreferrer">
                    <AiOutlineWhatsApp />
                </a>
              </div>
                
              <div className="">
                <a href={telegramLink} target="_blank" rel="noreferrer">
                    <FaTelegramPlane />
                </a>
              </div>
        
              <div className="">
                <a href={fbLink} target="_blank" rel="noreferrer">
                    <FiFacebook />
                </a>
              </div>
            
              <div className="">
                <a href={emailLink}>
                    <MdOutlineMarkEmailRead />
                </a>
              </div>
            </div>

       </div>
      )
}