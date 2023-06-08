import { hashPassword } from "@/helper/lib/auth";
import { connectToDatabase } from "@/helper/lib/db";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // quick validation
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message: "Invalid Input",
      });
      return;
    }

    // connect to database
    const client = await connectToDatabase();
    const db = client.db();

    // verify there isn't already an user with that email
    const alreadyExistingUser = await db
      .collection("deskyUsers")
      .findOne({ email: email });
    if (alreadyExistingUser) {
      client.close();
      res.status(422).json({
        message: "User already exist!",
      });
      return;
    }

    // save user in database, all ok
    const hashedPassword = await hashPassword(password);
    const saveUserResult = await db.collection("deskyUsers").insertOne({
      email: email,
      password: hashedPassword, // never save password without encrypting
    });

    // Check errors on save
    console.log(saveUserResult);

    // Send ok
    res.status(201).json({ message: "Created user!" });
    client.close();
  }
}

export default handler;
