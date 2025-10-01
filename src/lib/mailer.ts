import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST || "smtp.hostinger.com";
const port = Number(process.env.SMTP_PORT || 465);
const secure = (process.env.SMTP_SSL || "true") === "true"; // 465 = true
const user = process.env.SMTP_USER!;
const pass = process.env.SMTP_PASS!;
const from = process.env.SMTP_SENDER || `MGL CRM <${user}>`;

export const mailer = nodemailer.createTransport({
  host, port, secure,
  auth: { user, pass },
});

export async function sendMail(opts: { to: string; subject: string; html: string; text?: string }) {
  return mailer.sendMail({ from, ...opts });
}
