import modal from "modal-rt";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useUserContext } from "../../context/userContext/userContext";
import { trpc } from "../../utlis/trpc/trpc";
import Button from "../Button/Button";

export default function EmailForm() {
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");

    const { emailRemaining, rawStateUpdate } = useUserContext();
    const { mutate, isLoading } = trpc.user.sendEmail.useMutation({
        onSuccess: (data) => {
            toast.success("Email sent");
            setFrom("");
            setTo("");
            rawStateUpdate!({ payload: data?.emailRemaining, field: "emailRemaining" })
            setTimeout(() => {
              modal.close()
            }, 1000);
        }
    });

    const send = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(emailRemaining === 0 || emailRemaining! < 0){
            toast.error("You have no email remaining");
            return;
        }

        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ig.test(to) === false){
          toast.error("Invalid email");
          return;
        }
        
        if(to){
            mutate({ from, to });
        } else {
            toast.error("Email is required");
        }
        
    }

    return (
        <form className="modal-container" onSubmit={send}>
          <div>
            <h1 className="text-xl font-bold mb-1">Send Email</h1>
          </div>

          <div className="mb-2">
            <p className="text-xs">Attempts Remaining <span className="dot">{emailRemaining}</span></p>
          </div>
        
          <div className="w-full my-2 relative z-[0]">

            <input 
              placeholder=" "
              value={from}
              onChange={(e) => setFrom(e.target.value)}  
              type="text" 
              id="emailFrom" 
              className="w-full px-1 py-2 mb-3 outline-none text-slate-800  dark:text-slate-200 bg-transparent border-b focus:border-blue-500 border-gray-300 appearance-none peer"
            />
            <label 
              className="absolute left-0 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              htmlFor="emailFrom"
            >From</label>
          </div>

          <div className="w-full my-2 relative z-[0]">

            <input 
              placeholder=" " 
              value={to}
              onChange={(e) => setTo(e.target.value)} 
              type="text" 
              id="emailTo" 
              className="w-full px-1 py-2 mb-3 outline-none text-slate-800  dark:text-slate-200 bg-transparent border-b focus:border-blue-500 border-gray-300 appearance-none peer"
            />
            <label 
              className="absolute left-0 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              htmlFor="emailTo"
            >To</label>
          </div>

          <div className="mt-4">
            <Button text="Send" type="submit" loading={isLoading} width={24} height={8} />
          </div>

        </form>
      )
}