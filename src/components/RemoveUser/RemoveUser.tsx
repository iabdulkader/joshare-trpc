import { useRouter } from "next/router";
import { removeUser } from "../../utlis/token/token";
import { modal } from "modal-rt";
import Button from "../Button/Button";

export default function RemoveUser() {
    const router = useRouter();

    const deleteUser = () => {
        removeUser();
        modal.close();
        router.push("/");
    }

    return (
       <div className="modal-container text-center text-xs">
            <div>
                <p>By clearing this session you will be able to upload files and share them with new PIN and also will be able to send another Email.
                <br />
                <br />
                Although your current session&apos;s files won&apos;t get deleted before 24 hours unless you manually delete them while you are in that session. That means even after clearing this session your files can be downloaded with Share Link, QR Code or with PIN before they expires in 24 hours.</p>
            </div>

            <div className="mt-4">
                <Button text="Remove User" width={30} height={8} onClick={deleteUser} />
            </div>
       </div>
      )
}