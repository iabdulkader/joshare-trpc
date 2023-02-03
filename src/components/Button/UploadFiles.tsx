import useSignup from "../../hooks/useSignup";
import Button from "./Button";

export default function UploadFiles({ height = 10 }: { height?: number }) {
  const { signup, isLoading } = useSignup();

  return (
    <Button
      height={height}
      width={32}
      text="Upload Files"
      onClick={signup}
      loading={isLoading}
    />
  );
}
