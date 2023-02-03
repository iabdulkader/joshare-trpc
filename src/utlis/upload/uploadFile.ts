import { Socket } from "socket.io-client";
import axios from "axios";
import cookie from "js-cookie";
import { FileType } from "../../types";

export const upload = async (file: FileType, socket: Socket, pin: string) => {
  const formData = new FormData();
  formData.append("file", file.file!);
  formData.append("fileId", file.id);

  axios
    .request({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_FILES_SERVER}/api/upload`,
      data: formData,
      headers: {
        "x-authorization": `Bearer ${cookie.get("token")}`,
      },
      signal: file.cancelUpload!.signal,
      onUploadProgress: (p) => {
        socket.emit("upload-progress", {
          pin,
          id: file.id,
          file: {
            id: file.id,
            progress: Math.round((p.loaded / p.total!) * 100),
            name: file.name,
            ext: file.ext,
            size: file.size,
          },
        });
      },
    })
    .then((data) => {
      socket.emit("upload-complete", {
        pin,
        file: data?.data?.data as FileType,
      });
    })
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("Request canceled", err.message);
      } else {
        console.log("Something went wrong: ", err.message);
      }
    });
};
