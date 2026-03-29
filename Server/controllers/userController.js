import { supabase } from "../supabaseClient.js";

export const getAllUsersController = async (req, res) => {
    try{
        const data = await supabase
            .from("users")
            .select("fname, lname, id");

        res.json({ users: data })

        res.status(201).json({ message: "Användare hämtade!", resultat: data})
        console.log("USERS", res)
    } catch{

    }
}