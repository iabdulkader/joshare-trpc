import Cookies from "js-cookie";
import download from "downloadjs";
import toast from "react-hot-toast";
import { useState } from "react";

export default function useDownload(){
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("")

    const downloadFile = (id: string, name: string) => {
        setIsLoading(true);

        fetch(`${process.env.NEXT_PUBLIC_FILES_SERVER}/api/download/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-authorization": `Bearer ${Cookies.get('token')}`
            },
        })
        .then((res) => res.blob())
        .then((blob) => {
            download(blob, name);
            setIsLoading(false);
        })
        .catch((err) => {
            toast.error("Error downloading file.");
            setIsLoading(false);
            setError(err.message)
        })
    }
  
    return { downloadFile, isLoading, error}

}