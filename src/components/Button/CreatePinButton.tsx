import useSignup from "../../hooks/useSignup";

export default function CreatePinButton() {
    const {signup} = useSignup()

    return(
        <div onClick={signup} className="flex justify-center my-5">
            <button className="h-10 w-32 button">Upload Files</button>
        </div>     
    )
}