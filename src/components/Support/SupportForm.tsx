import { useState } from "react";
import { toast } from "react-hot-toast";
import { trpc } from "../../utlis/trpc/trpc";
import Button from "../Button/Button";
import Input from "../Input/Input";

type SupportFormType = {
  value: string;
  error: string;
};

export default function SupportForm() {
  const [name, setName] = useState<SupportFormType>({ value: "", error: "" });
  const [email, setEmail] = useState<SupportFormType>({ value: "", error: "" });
  const [message, setMessage] = useState<SupportFormType>({
    value: "",
    error: "",
  });

  const { mutate, isLoading } = trpc.support.postMessage.useMutation({
    onSuccess: () => {
      toast.success("Message sent successfully");

      setName({ value: "", error: "" });
      setEmail({ value: "", error: "" });
      setMessage({ value: "", error: "" });
    },
  });

  const validate = () => {
    let isValid = true;

    if (name.value === "") {
      setName({ ...name, error: "Name is required" });
      isValid = false;
    }

    if (name.value.trim().length < 3) {
      setName({ ...name, error: "Name must contain atleast 3 characters" });
      isValid = false;
    }

    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi.test(email.value) ===
      false
    ) {
      setEmail({ ...email, error: "Invalid email" });
      isValid = false;
    }

    if (email.value === "") {
      setEmail({ ...email, error: "Email is required" });
      isValid = false;
    }

    if (message.value === "") {
      setMessage({ ...message, error: "Must contain atleast 15 characters." });
      isValid = false;
    }

    if (message.value.length < 15 && message.value !== "") {
      setMessage({
        ...message,
        error: `Must contain atleast ${
          15 - message.value.length
        } more characters`,
      });
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      mutate({ name: name.value, email: email.value, message: message.value });
    }
  };

  return (
    <div className="my-5 max-w-[450px] flex flex-col items-center px-6 bg-secondaryBg-light dark:bg-secondaryBg-dark rounded-lg shadow-md">
      <div className="mt-8 mb-5">
        <h1 className="text-xs text-center text-primaryText-light dark:text-primaryText-dark">
          If you have any problem or suggestion please fill the form below and
          submit. We will contact you shotly.
        </h1>
      </div>

      <div className="mt-3 mb-8">
        <Input
          type="text"
          label="Name"
          value={name.value}
          error={name.error}
          onChange={(e) => setName({ error: "", value: e.target.value })}
        />

        <Input
          type="text"
          label="Email"
          value={email.value}
          error={email.error}
          onChange={(e) => setEmail({ error: "", value: e.target.value })}
        />

        <Input
          type="textarea"
          label="Message"
          value={message.value}
          error={message.error}
          onChange={(e) => setMessage({ error: "", value: e.target.value })}
        />

        <div className="mt-4 mb-10 flex justify-center">
          <Button
            text="Submit"
            height={10}
            width={32}
            onClick={handleSubmit}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
