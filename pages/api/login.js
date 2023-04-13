import { connectToDatabase } from "@/util/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      res.status(422).json({ message: "Invalid email" });
      return;
    }
    const userByEmail = await db.collection("users").findOne({ email });
    if (!userByEmail) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const comparePassword = await bcrypt.compare(
      password,
      userByEmail.password
    );
    if (!comparePassword) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }
    const generateToken = jwt.sign(
      { userId: userByEmail._id },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      message: "User login successful",
      generateToken,
      user: {
        userId: userByEmail._id,
        name: userByEmail.name,
        email: userByEmail.email,
        // Include other user data as needed
      },
    });
  }
}
