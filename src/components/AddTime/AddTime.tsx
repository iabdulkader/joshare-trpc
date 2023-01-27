import { modal } from "modal-rt";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { UserContext } from "../../context/userContext/userContext";
import { setUser } from "../../utlis/token/token";
import { trpc } from "../../utlis/trpc/trpc";
import Button from "../Button/Button"

export default function AddTime() {
    const [hour, setHour] = useState<number>(0);
    const { timeExtRemaining, pin, expire, rawStateUpdate } = useContext(UserContext);
    const options = [];

    const { mutate, isLoading } = trpc.user.extendTime.useMutation({
        onSuccess: async (data) => {
            (data.token)
            if(data.success) {
                rawStateUpdate!({ field: "timeExtRemaining", payload: data.timeExtRemaining })
                rawStateUpdate!({ field: "expire", payload: data.expire })
                setUser(data.token!, data.expire)
                toast.success("Time Extended")

                setTimeout(() => {
                    modal.close()
                }, 1000)
            } else {
                toast.error("Something went wrong")
            }
        }
    });


    for (var i = 0; i <= 24; i++) {
      options.push(<option className="bg-secondaryBg-light dark:bg-secondaryBg-dark" value={i} key={i}>{i === 0 ? "Select Time" : `${i} Hour`}</option>)
    }

    const addTime = () => {
        if(timeExtRemaining === 0) {
            toast.error("Time Extention limit exceeded")
            return
        }

        if(hour === 0) {
            toast.error("Select time to extend")
            return
        };

        

        mutate({ hour, pin, expire })
    }

    return (
       <div className="modal-container">
            <div>
                <h1 className="text-xl font-bold mb-3">Add Time</h1>
            </div>

            <div className="mb-2 text-center text-xs">
                <p>Your files will be deleted autometically after 24 hours from creating your session. But You can extend this expiry time upto additional 48 hours. To add time select how many hours you want to extend and click Add Time.</p>
            </div>


            <div className="mb-4">
                <p className="text-base">Attempts Remaining <span className="dot">{timeExtRemaining}</span></p>
            </div>

            <div>
                <select
                    disabled={timeExtRemaining === 0} 
                    value={hour}
                    onChange={(e) => setHour(parseInt(e.target.value))}
                    className="bg-transparent border-b border-gray-300 focus:border-blue-500 text-slate-800 outline-none dark:text-slate-200 w-24 h-8 scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-900 scrollbar-track-secondaryBg-light dark:scrollbar-track-secondaryBg-dark scrollbar-thumb-rounded-lg scrollbar-thin"
                    name="hours" 
                >                
                    {options}
                </select>
            </div>

            <div className="mt-4">
                <Button 
                    text="Add Time" 
                    loading={isLoading} 
                    onClick={addTime} 
                    width={24} 
                    height={8} 
                />
            </div>
       </div>
      )
}