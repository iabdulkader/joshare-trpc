import Cookies from "js-cookie";
import download from "downloadjs";
import toast from "react-hot-toast";

export async function downloadFile(id: string, name: string) {
    fetch(`${process.env.NEXT_PUBLIC_FILES_SERVER}/api/download/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-authorization": `Bearer ${Cookies.get('token')}`
        },
    })
    .then((res) => res.blob())
    .then((blob) => {
        download(blob, name) 
    })
    .catch((err) => {
        toast.error("Error downloading file.")
    })

};