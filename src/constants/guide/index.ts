export type Guide = {
    text: string[];
    image: string;
};

export const BASIC_GUIDE: Guide[] = [
    {
        text: ["To Share files press Upload Files.", "This will take you to your dashboard where you will do everything."],
        image: "home.png",
    },
    {
        text: ["This is your dashboard. Here you can upload files, view your files, and do all the other things."],
        image: "myfiles.png",
    },
    {
        text: ["This is the File Upload Box. Drag and Drop your Files or click Browse.", "You can upload multiple files at once. But you can't upload files over 30MB."],
        image: "upload.png",
    },
    {
        text: ["After selecting file or files, your file(s) will get uploaded. You can see their progress.."],
        image: "uploading.png",
    },
    {
        text: ["After uploading files, you will see your files on dashboard like this", "You can delete the files permanently by clicking the delete button and download the files by clicking the download button.", "you can share your files by clicking the share button. This will take you to the share page."],
        image: "myfileswithfile.png",
    },
    {
        text: ["you can share your files by copying your pin from dashboard or copy the link from here", "Then send this to the person with whom you want to share the files.", "You can share files scaning QR code."],
        image: "share.png",
    },
    {
        text: ["The person you share your files with have to enter your pin here in the PIN box and click search.", "Then they will be taken to files page.", "Also they can paste the share link in the browser and they will be taken to files page."],
        image: "home.png",
    },
    {
        text: ["The person you share your files with will see your files here.", "They can download the files by clicking the download button."],
        image: "file.png",
    },
];

export const ADVANCED_GUIDE: Guide[] = [
    {
        text: ["Here the buttons below are some controllers", "The First one to send email with files link. Second one for extending expiry time of files. Third one for deleting files with the user space permanently."],
        image: "myfiles.png",
    }, 
    {
        text: ["This is Email Sender. It's kind of self explanatory.", "you have only 2 email sending attempts on free plan"],
        image: "email.png",
    },
    {
        text: ["This is the Expiry Time Extender. It's kind of self explanatory. Select times in hours and it will extend expiry time for your files", "you have only 2 expiry time extension attempts on free plan"],
        image: "time.png",
    },
    {
        text: ["This is user session removal wizard. This will delete all the files and the user space as well. Read the info displayed, you will understand."],
        image: "remove.png",
    },
    {
        text: ["This is the support page. You can leave your message, suggestiions or complaints here. We will try to reply as soon as possible."],
        image: "support.png",
    },
];