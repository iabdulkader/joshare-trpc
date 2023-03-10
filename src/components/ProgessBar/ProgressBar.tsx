import { FileIcon, defaultStyles } from "react-file-icon";
import { AiOutlineDelete } from "react-icons/ai";
import { useFilesContext } from "../../context/filesContext/filesContext";
import { useSocketContext } from "../../context/socketContext/SocketContext";
import { useUserContext } from "../../context/userContext/userContext";
import { FileType } from "../../types";

export default function ProgressBar({ file }: { file: FileType }) {
  const iconStyles = (defaultStyles as any)[file.ext || "docx"] || {};
  let progress: number = file.progress! / 100;

  const { removeFilesFromPending } = useFilesContext();
  const { pin } = useUserContext();
  const { socket } = useSocketContext();

  const progressStyle: { transform: string } = {
    transform: `scaleX(${progress})`,
  };

  if (progress === 1) {
    setTimeout(() => {
      removeFilesFromPending!(file.id);
    }, 1000);
  }

  const cancelUpload = () => {
    if (progress === 1) return;
    file.cancelUpload!.abort();

    socket?.emit("cancel-upload", { id: file.id, pin });
  };

  return (
    <div className="w-full px-4 pt-4 last:pb-4">
      <div className="border border-slate-400 dark:border-slate-500 rounded-lg h-14 relative overflow-hidden">
        <div
          style={progressStyle}
          className="w-full h-full bg-[#e0e2e7] dark:bg-[#303e61] rounded-lg origin-left scale-x-[0] transition-all duration-300 ease-in-out"
        ></div>

        <div className="absolute top-0 left-0 flex h-full w-full">
          <div className="h-[18px] w-[20px] my-auto ml-3">
            <FileIcon extension={file.ext} {...iconStyles} key={file.id} />
          </div>

          <div className="ml-3 flex-col flex justify-center h-full w-full flex-grow-1">
            <input
              className="bg-transparent w-full text-xs border-none outline-none"
              type="text"
              name=""
              value={file.name}
              readOnly
            />

            <input
              className="bg-transparent w-full text-[9px] border-none outline-none font-light text-slate-600 dark:text-slate-300"
              type="text"
              name=""
              value={file.size}
              readOnly
            />
          </div>

          <div className="flex items-center justify-end ml-3 mr-3 w-16">
            <p className="text-xs flex gap-1 mr-2">
              {file.progress!} <span>%</span>
            </p>

            <div className="text-lg w-6">
              <AiOutlineDelete
                className="cursor-pointer hover:scale-105 hover:font-bold transition-all duration-300"
                onClick={cancelUpload}
              />
            </div>
          </div>

          <div
            style={progressStyle}
            className="absolute left-0 bottom-1.5 h-[2px] rounded-[1px] bg-[#03a9f4] w-[calc(100%-1.5rem)] scale-x-0 ml-3 origin-left transition-all duration-300 ease-in-out"
          ></div>
        </div>
      </div>
    </div>
  );
}
