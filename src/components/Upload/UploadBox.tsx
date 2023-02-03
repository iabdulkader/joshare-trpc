import { ChangeEvent, useContext, useRef } from "react";
import { useFilesContext } from "../../context/filesContext/filesContext";
import { handleFiles } from "../../utlis/upload/handleFiles";
import FileIcon from "../Icons/FileIcon";
import { nanoid } from "nanoid";
import { useUserContext } from "../../context/userContext/userContext";
import { sizeModifier } from "../../utlis/upload/sizeModifier";
import { useSocketContext } from "../../context/socketContext/SocketContext";
import { FilesType, FileType } from "../../types";

export default function UploadBox() {
  const fileRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const { addFilesToPending } = useFilesContext();
  const { pin } = useUserContext();
  const { socket } = useSocketContext();

  const triggerFile = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dragRef.current) {
      dragRef.current.classList.add("drag");
    }
  };

  const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dragRef.current) {
      dragRef.current.classList.add("drag");
    }
  };

  const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (dragRef.current) {
      dragRef.current.classList.remove("drag");
    }
  };

  const filesArray = (files: HTMLInputElement["files"]) => {
    let filesObj: FilesType = {};

    for (let i = 0; i < files!.length; i++) {
      let id = nanoid(5);
      const controller = new AbortController();

      filesObj[id] = {
        id: id,
        file: files![i],
        progress: 0,
        name: files![i].name,
        size: sizeModifier(files![i].size),
        ext: files![i].name.slice(
          (Math.max(0, files![i].name.lastIndexOf(".")) || Infinity) + 1
        ),
        cancelUpload: controller,
      };
    }
    return filesObj;
  };

  const fileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dragRef.current) {
      dragRef.current.classList.remove("drag");
    }
    let files = filesArray(e.dataTransfer.files);

    addFilesToPending!(files);

    handleFiles(files, socket!, pin);
  };

  const uploadFiles = (e: ChangeEvent<HTMLInputElement>) => {
    let files = filesArray(e.target.files);
    addFilesToPending!(files);

    handleFiles(files, socket!, pin);
  };

  return (
    <div className="w-full px-4 top-[70vh] mb-2">
      <div className="w-full p-4 flex justify-between items-center bg-secondaryBg-light dark:bg-secondaryBg-dark  rounded-lg">
        <div
          className="w-full h-full border border-dashed border-[#4fa94d] rounded-lg group"
          ref={dragRef}
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
        >
          <div className="w-full flex justify-center pt-8">
            <FileIcon
              key={1}
              className="group-[.drag]:rotate-12 group-[.drag]:scale-90 group-[.drag]:translate-x-5"
            />
            <FileIcon
              key={2}
              className="group-[.drag]:-rotate-12 group-[.drag]:scale-90 group-[.drag]:-translate-x-5"
            />
            <FileIcon key={3} className="group-[.drag]:-translate-y-1.5" />
          </div>

          <div className="flex flex-col items-center w-full mt-24 mb-4">
            <input
              className="hidden"
              ref={fileRef}
              onChange={uploadFiles}
              type="file"
              multiple
            />
            <p className="text-sm">
              Drag & Drop Your Files Or{" "}
              <span
                className="text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer"
                onClick={triggerFile}
              >
                Browse
              </span>
            </p>
            <p className="text-[10px] font-light text-slate-600 dark:text-slate-300">
              Max file size 30MB.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
