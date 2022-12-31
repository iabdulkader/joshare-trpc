import useSignup from "../../hooks/useSignup";

export default function UploadFiles() {
    const {signup} = useSignup();

    return (
      
        <button onClick={signup} className="button h-8 w-36">Upload Files</button>
       
      )
}