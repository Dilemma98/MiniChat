import { supabase } from "../supabaseClient.js"
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const registerController = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await supabase
      .from("users")
      .insert({ fname, lname, email, password: hashedPassword });
    res.status(201).json({ message: "Användare skapad"})
  } catch {
    res.status(500).json({ message: "Konto kunde inte skapas" });
  }
};

export const loginController = async (req, res) => {
     const { email, password } = req.body;
  try {
    // Fetch data from database
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    // Check if user exists
    if (!data) {
      return res.status(404).json({ message: "Användaren hittades inte" });
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, data.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Fel användarnamn eller lösenord" });
    }

    // All ok!
     const token = jwt.sign(
        { userId: data.id},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    )
    res.status(200).json({ message: "Inloggad!", token, user: { name: data.fname , id: data.id} })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Något gick fel" });
  }
}
