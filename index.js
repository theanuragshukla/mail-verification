require("dotenv").config();
const express = require("express");
const crypto = require("crypto");

require("./database/connection");
const userModel = require("./database/userModel");

const port = process.env.PORT || 3000;
const SERVER_URL = process.env.SERVER_URL;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

const app = express();
const Mailer = require("./Mailer");
let mailer = new Mailer({
  service: "gmail",
  email: EMAIL,
  password: PASSWORD,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.json({ status: true, msg: "Server is running" });
});

async function sendMail({ subject, user }) {
  return await mailer.sendMail({
    email: user.email,
    subject: subject || "Email Verification",
    html: `<h1>Click <a href="${SERVER_URL}/verify?uid=${user.uid}">here</a> to verify your email</h1>`,
  });
}

app.post("/send-mail", async (req, res, next) => {
  try {
    const { firebaseId, email } = req.body;
    if (!firebaseId || !email) {
      return res.status(400).json({ status: false, msg: "Invalid request" });
    }
    let user = await userModel.findOne({ firebaseId, email });
    if (!user) {
      user = new userModel({
        firebaseId,
        email,
        uid: crypto.randomUUID(),
      });
      const dbUser = await user.save().catch(() => {
        return res.json({ status: false, msg: "Failed to save user" });
      });
      if (dbUser.firebaseId !== firebaseId) {
        return;
      }
    }
    const isMailSent = await sendMail({ user });
    return res.json({
      status: isMailSent,
      data: { isVerified: user.isVerified },
      msg: isMailSent ? "Mail sent" : "Failed to send email",
    });
  } catch (err) {
    next(err);
  }
});

app.get("/check-status", async (req, res, next) => {
  try {
    const { firebaseId, email } = req.query;
    if (!firebaseId || !email) {
      return res.status(400).json({ status: false, msg: "Invalid request" });
    }
    const user = await userModel.findOne({ firebaseId, email });
    return res.json({status:true, isVerified: !!user ? user.isVerified : false });
  } catch (err) {
    next(err);
  }
});

app.get("/verify", async (req, res, next) => {
  try {
    const { uid } = req.query;
    if (!uid) {
      return res.status(400).json({ status: false, msg: "Invalid request" });
    }
    const user = await userModel.findOne({ uid });
    if (!!user) {
      user.isVerified = true;
      const dbUser = await user.save().catch(() => {
        return res.json({ status: false, msg: "Failed to save user" });
      });
      if (dbUser.uid !== uid) {
        return;
      }
      return res.json({ status: true, msg: "Email verified" });
    } else {
      return res.status(404).json({ status: false, msg: "User not found" });
    }
  } catch (err) {
    next(err);
  }
});

app.use((err, _, res) => {
  console.log(err.stack);
  res.json({ status: false, msg: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
