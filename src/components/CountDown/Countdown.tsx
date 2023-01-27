import { useState, useEffect, useContext } from "react";
import { Watch } from "react-loader-spinner";
import { UserContext } from "../../context/userContext/userContext";

export default function CountDown() {
    const { expire } = useContext(UserContext);

    const [hours, setHours] = useState<string>("00");
    const [minutes, setMinutes] = useState<string>("00");
    const [seconds, setSeconds] = useState<string>("00");
    const [expired, setExpired] = useState(false);

    useEffect(() => {
        
        const expireTime = expire.getTime();
        
        function countDown(){
        const nowTime = new Date().getTime();
        let gap = expireTime - nowTime;
        
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
            
        let h = Math.floor(gap / hour);
        let m = Math.floor((gap % (hour)) / (minute));
        let s = Math.floor((gap % (minute)) / (second));
            
        var hr = h < 10 ? "0" + h : h + "";
        var mn = m < 10 ? "0" + m : m + "";
        var sc = s < 10 ? "0" + s : s + "";
            
        if (h < 0 || h == null){
            setExpired(true)
        } else {
            setHours(hr);
            setMinutes(mn);
            setSeconds(sc);
            setExpired(false);
        } 
        };
        
        countDown();
        const interval = setInterval(() => {
            countDown();
        }, 1000);
        
        return () => clearInterval(interval);
    }, [expire])

    if(expire.getTime() === new Date(0).getTime()) {
        return (
            <Watch 
                color="#ff5757"
                height={23}
                width={23}
            />)
        } 

    if(expired) return (
        <h4>Expired</h4>
        );

    return (
        <div>
            <h4 className="font-sans">
                {hours}:{minutes}:{seconds}
            </h4>  
        </div>
        )
}