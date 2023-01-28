import { useState } from "react";
import { toast } from "react-hot-toast";
import { trpc } from "../../utlis/trpc/trpc";
import Button from "../Button/Button";

type SupportFormType = {
    value: string;
    error: string;
}

export default function SupportForm(){
    const [name, setName] = useState<SupportFormType>({value: "", error: ""});
    const [email, setEmail] = useState<SupportFormType>({value: "", error: ""});
    const [message, setMessage] = useState<SupportFormType>({value: "", error: ""});

    const { mutate, isLoading } = trpc.support.postMessage.useMutation({
        onSuccess: () => {
            toast.success("Message sent successfully");
            
            setName({ value: "", error: "" });
            setEmail({ value: "", error: "" });
            setMessage({ value: "", error: "" });
        }
    });


    const handleSubmit = () => {
        if(name.value === ""){
            setName({ ...name, error: "Name is required" });
            return;
        }

        if(name.value.trim().length < 3){
            setName({ ...name, error: "Name must contain atleast 3 characters" });
            return;
        }
        

        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ig.test(email.value) === false){
            setEmail({ ...email, error: "Invalid email" });
            return;
        }

        if(message.value.length < 15){
            setMessage({ ...message, error: "Name must contain atleast 15 characters" });
            return;
        }

        if(name.error === "" && email.error === "" && message.error === ""){
            mutate({ name: name.value, email: email.value, message: message.value })
        }
    }



    return (
        <div className="my-5 max-w-[450px] flex flex-col items-center px-6 bg-secondaryBg-light dark:bg-secondaryBg-dark rounded-lg shadow-md">
            <div className="mt-8 mb-5">
                <h1 className="text-xs text-center text-primaryText-light dark:text-primaryText-dark">If you have any problem or suggestion please fill the form below and submit. We will contact you shotly.</h1>
            </div>

            <div className="mt-3 mb-8">
                <div className="mb-0 relative z-[0]">

                    <input 
                    placeholder=" "
                    value={name.value}
                    onChange={(e) => setName({ error: "", value: e.target.value })}
                    type="text" 
                    id="name" 
                    className={`w-full py-2 mb-1 outline-none text-slate-800  dark:text-slate-200 bg-transparent border-b focus:border-blue-500 ${name.error ? "border-red-600" : "border-gray-300"} appearance-none peer`}
                    />
                    <label 
                    className="absolute left-0 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    htmlFor="name"
                    >Name</label>

                    <p className="inset-0 my-0 text-xs text-red-600 dark:text-red-500">{name.error}</p>
                </div>

                <div className="my-2 relative z-[0]">

                    <input 
                    placeholder=" " 
                    value={email.value}
                    onChange={(e) => setEmail({ error: "", value: e.target.value })}
                    type="text" 
                    id="email" 
                    className={`w-full py-2 mb-1 outline-none text-slate-800  dark:text-slate-200 bg-transparent border-b focus:border-blue-500 ${email.error ? "border-red-600" : "border-gray-300"} appearance-none peer`}
                    />
                    <label 
                    className="absolute left-0 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    htmlFor="email"
                    >Email</label>

                    <p className="inset-0 my-0 text-xs text-red-600 dark:text-red-500">{email.error}</p>
                </div>

                <div className="my-2 relative z-[0]">

                    <textarea 
                    placeholder=" " 
                    value={message.value}
                    onChange={(e) => setMessage({ error: "", value:     e.target.value })}
                    id="description" 
                    className={`w-full py-2 mb-1 outline-none min-h-[10rem] text-slate-800  dark:text-slate-200 bg-transparent border-b focus:border-blue-500 ${message.error ? "border-red-600" : "border-gray-300"} appearance-none peer`}
                    />
                    <label 
                    className="absolute left-0 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    htmlFor="description"
                    >Description</label>

                    <p className="inset-0 my-0 text-xs text-red-600 dark:text-red-500">{message.error}</p>
                </div>


                <div className="mt-4 mb-10 flex justify-center">
                    <Button text="Submit" height={10} width={32} onClick={handleSubmit} loading={isLoading} />
                </div>

            </div>

        </div>
    )
}