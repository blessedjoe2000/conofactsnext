import { connectToDatabase } from "@/util/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  if (req.method === "POST") {
    const {
      name,
      email,
      password,
      passwordConfirm,
      username,
      dob,
      about,
      location,
      interests,
    } = req.body;

    const hashedPassword = bcrypt.hash(password, 10);
    const user = {
      name,
      email,
      password: hashedPassword,
      username,
      dob,
      about,
      location,
      interests,
    };

    const connection = await db.collection("users").insertOne(user);

    const generateToken = jwt.sign(
      { userId: connection.insertedId },
      process.env.JWT_SECRET
    );

    res.status(201).json({
      message: "user created",
      generateToken,
      userId: connection.insertedId,
    });
  }
}
