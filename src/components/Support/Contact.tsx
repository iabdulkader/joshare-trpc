import { FiTwitter } from "react-icons/fi";
import { MdOutlineMarkEmailRead } from "react-icons/md";

export default function Contact() {
  return (
    <div className="my-5 max-w-[450px] w-full flex flex-col items-center px-6 bg-secondaryBg-light dark:bg-secondaryBg-dark rounded-lg shadow-md">
      <div className="my-5">
        <h1>Contact</h1>
      </div>

      <div className="mt-3 mb-8 flex flex-col gap-3 items-center text-lg">
        <div>
          <MdOutlineMarkEmailRead className="inline" /> :{" "}
          <a href="mailto:support@joshare.xyz" target="_blank">
            support@joshare.xyz
          </a>
        </div>
        <div>
          <FiTwitter className="inline" /> :{" "}
          <a href="https://twitter.com/itsabdulkader" target="_blank">
            Twitter
          </a>
        </div>
      </div>
    </div>
  );
}
