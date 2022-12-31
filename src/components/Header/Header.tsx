import Link from "next/link";
import modal from "modal-rt";
import Countdown from "../CountDown/Countdown";
import SharePage from "../SharePage/SharePage";
import UploadFiles from "../Button/UploadFiles";
import Logo from "../Logo/Logo";
import { BsShare } from "react-icons/bs"
import { Path } from "../../types";

export default function Header({ path }: { path: string }) {
    const openSharePage = () => {
        modal(<SharePage />)
    }


    return(
        <>
            { path === Path.home ? null :                    
                (
                <div className="fixed top-0 left-0 w-full bg-bg-light dark:bg-bg-dark h-14 px-3 lg:px-20 flex justify-between items-center z-10">
                    <div className="w-full max-w-[150px]">
                        <Link href="/" className="flex justify-center items-center h-full">
                            <Logo />
                        </Link>
                    </div>

                
                    { Object.values(Path).includes(path as Path) ? 
                        (
                        <div className="flex flex-row items-center gap-3 lg:gap-6 pr-2">
                            <UploadFiles />
                        </div>
                        ): 
                        (
                        <div className="flex flex-row items-center gap-3 lg:gap-6 pr-2">
                            <Countdown />
                            <BsShare onClick={openSharePage} className="hover:text-red-400 cursor-pointer" />
                        </div>
                    )}
                
                                
                </div>
                )
            }
    </>
    )
}