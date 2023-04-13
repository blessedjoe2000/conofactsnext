import { connectToDatabase } from "@/util/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  if (req.method === "POST") {
    const { email, password } = req.body;

    const userByEmail = await db.collection("users").findOne(email);
    console.log("user", userByEmail);
    const generateToken = jwt.sign(
      { userId: connection.insertedId },
      process.env.JWT_SECRET
    );

    if (userByEmail && bcrypt.compare(password, userByEmail.password)) {
      res.status(200).json({
        _id: userByEmail.id,
        name: userByEmail.name,
        email: userByEmail.email,
        username: userByEmail.username,
        dob: userByEmail.dob,
        about: userByEmail.about,
        location: userByEmail.location,
        token: generateToken(userByEmail._id),
      });
    }
  }
}
