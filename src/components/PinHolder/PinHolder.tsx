import { FiCopy } from "react-icons/fi";
import toast from "react-hot-toast";
import { useUserContext } from "../../context/userContext/userContext";

export default function PinHolder() {
  const { pin } = useUserContext();

  const copy = () => {
    navigator.clipboard.writeText(pin);
    toast.success("Copied");
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex items-center gap-3 border dark:border-bg-light border-bg-dark px-3 py-2 rounded-lg">
        <code>{pin}</code>
        <FiCopy onClick={copy} className="cursor-pointer" />
      </div>
    </div>
  );
}
