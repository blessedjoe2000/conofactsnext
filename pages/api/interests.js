import { connectToDatabase } from "@/util/mongodb";
import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: "Unauthorized access" });
    return;
  }
  const { interests } = req.body;
  const { db } = await connectToDatabase();
  const { email } = session.user;
  const result = await db.collection("users").updateOne(
    { email },
    {
      $set: {
        interests,
      },
    }
  );
  if (result.modifiedCount === 1) {
    res.status(200).json({ message: "Interests updated" });
  } else {
    res.status(500).json({ message: "Failed to update interests" });
  }
}
