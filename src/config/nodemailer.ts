import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "3dcontentstudio.com",
  port: 465,
  secure: true,
  auth: {
    user: "test-mail-dev@3dcontentstudio.com",
    pass: "{n(ujwvoL@NS",
  },
});
