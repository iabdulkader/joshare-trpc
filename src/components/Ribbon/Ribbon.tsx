import { MdOutlineAttachEmail } from "react-icons/md";
import { RiTimerFlashLine } from "react-icons/ri";
import { TiUserDeleteOutline } from "react-icons/ti";
import { modal } from "modal-rt";
import EmailForm from "../Email/EmailForm";
import AddTime from "../AddTime/AddTime";
import RemoveUser from "../RemoveUser/RemoveUser";

export default function Ribbon() {
  const emailModal = () => {
    modal(<EmailForm />);
  };

  const addTimeModal = () => {
    modal(<AddTime />);
  };

  const removeUserModal = () => {
    modal(<RemoveUser />);
  };

  return (
    <div className="w-full px-4 mb-5 top-[70vh]">
      <div className="w-full px-4 h-10 flex justify-between items-center rounded-lg bg-secondaryBg-light dark:bg-secondaryBg-dark">
        <MdOutlineAttachEmail
          onClick={emailModal}
          className="hover:scale-110 cursor-pointer transition-all duration-300"
        />
        <RiTimerFlashLine
          onClick={addTimeModal}
          className="hover:scale-110 cursor-pointer transition-all duration-300"
        />
        <TiUserDeleteOutline
          onClick={removeUserModal}
          className="hover:scale-110 cursor-pointer transition-all duration-300"
        />
      </div>
    </div>
  );
}
