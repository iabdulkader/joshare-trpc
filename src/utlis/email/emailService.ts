import nodemailer from "nodemailer";
import { emailService } from "./../../types/index";
import emailTemplate from "./template";
import getExpireTime from "./getExpireTime";

export async function emailSender({ from, to, pin, expire }: emailService) {
  let fromUser: string = from?.trim() || "JoShare";
  let subject: string = "JoShare - File Sharing";
  let text: string = `${fromUser} shared some files with you.`;
  let link: string = `${process.env.NEXT_PUBLIC_CLIENT_URL}/files/${pin}`;
  let expireTime: string = getExpireTime(expire);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    let info = await transporter.sendMail({
      from: `JoShare <${from}>`,
      to,
      subject,
      text,
      html: emailTemplate({ from: fromUser, link, expire: expireTime }),
    });

    return {
      success: true,
      message: "Email sent successfully",
      messageId: info.messageId,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
