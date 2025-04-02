import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendEmail = async (to, subject, html) => {
  console.log("🔹 sendEmail() function called!");

  if (!to) {
    console.error("❌ Error: No recipient email provided!");
    throw new Error("Recipient email is required.");
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: Array.isArray(to) ? to.join(",") : to, // Support multiple recipients
      subject,
      html, // Use HTML instead of plain text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.response);
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw error;
  }
};

export default sendEmail;
