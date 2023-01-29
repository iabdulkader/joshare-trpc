import modal from "modal-rt";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useUserContext } from "../../context/userContext/userContext";
import { trpc } from "../../utlis/trpc/trpc";
import Button from "../Button/Button";
import Input from "../Input/Input";

export default function EmailForm() {
    const [from, setFrom] = useState<{value: string, error: string}>({ value: "", error: "" });
    const [to, setTo] = useState<{value: string, error: string}>({ value: "", error: "" });

    const { emailRemaining, rawStateUpdate } = useUserContext();
    const { mutate, isLoading } = trpc.user.sendEmail.useMutation({
        onSuccess: (data) => {
            toast.success("Email sent");
            setFrom({ value: "", error: "" });
            setTo({ value: "", error: "" });
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

        if(to.value === ""){
            setTo({ ...to, error: "Email is required" });
            toast.error("Email is required");
            return;
        }

        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ig.test(to.value) === false){
          setTo({ ...to, error: "Invalid email" });
          toast.error("Invalid email");
          return;
        }
        
        if(to){
            mutate({ from: from.value, to: to.value });
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
        
          <Input
            value={from.value}
            onChange={(e) => setFrom({ value: e.target.value, error: "" })}
            label="From"
            type="text"
            error={from.error}
          />

          <Input
            value={to.value}
            onChange={(e) => setTo({ value: e.target.value, error: "" })}
            label="To"
            type="text"
            error={to.error}
          />

          <div className="mt-4">
            <Button text="Send" type="submit" loading={isLoading} width={24} height={8} />
          </div>

        </form>
      )
}