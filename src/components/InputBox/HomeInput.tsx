import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { trpc } from '../../utlis/trpc/trpc';
import { getUser } from '../../utlis/token/token';
import { useRouter } from 'next/router';

export default function HomeInput() {
    const [pin, setPin] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const user = getUser()

    const { mutate, isLoading } = trpc.user.getUser.useMutation({
        onSuccess: (data) => {
            if(data?.user?.pin && user?.pin === data?.user?.pin){
                router.push("/myfiles");
            }

            if(data?.user?.pin && user?.pin !== data?.user?.pin){
                router.push(`/files/${data?.user?.pin}`);
            }
            
        },
        onError: (err) => {
            setError(err.message);
        }
    });


    const getUserByPin = () => {
        if(pin.length !== 8){
            setError("Pin must be 8 characters long");
            return;
        }
        mutate({ pin });
    }
    

    return(
        <div className="w-full flex flex-col justify-center">
            <div 
                className={`w-full focus-within:border-green-700 dark:focus-within:border-green-700 focus-within:scale-105 transition-all duration-300 h-12 mx-auto bg-transparent max-w-[250px] lg:max-w-[300px] flex items-center border border-bg-dark dark:border-bg-light rounded-lg ${error ? "border-red-500 dark:border-red-500" : ""}`}
                >
                <input 
                    className="w-full h-full border-none outline-none bg-transparent px-5" 
                    value={pin}
                    onChange={(e) => {
                        setPin(e.target.value)
                        setError("");
                    }}
                    type="number" 
                    placeholder="Paste pin..." 
                    required
                />

                
                <div className="mx-2 h-full flex justify-center items-center">
                    { isLoading ? 
                    ( <svg className="stroke-slate-900 dark:stroke-slate-50 mx-auto h-12 w-6" width="20px" height="20px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <circle cx="50" cy="50" fill="none" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                        </circle>
                      </svg>
                    ) :
                        <IoIosSearch onClick={getUserByPin} className='cursor-pointer text-bg-dark dark:text-bg-light h-12 w-6' />
                    }
                </div>
                
                
            </div>
            
            <p className="h-5 pt-[.15rem] text-center  peer-focus:bg-green-500 text-red-600 dark:text-red-700 text-sm">
                {error}
            </p>
        </div>
        )
    }