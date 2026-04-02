import { supabase } from "../supabaseClient.js";
import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const getAllUsersController = async (req, res) => {
    try{
        const data = await supabase
            .from("users")
            .select("fname, lname, id");

        res.json({ users: data })

        res.status(201).json({ message: "Användare hämtade!", resultat: data})
        console.log("USERS", res)
    } catch{
        res.satus(500).json({ message: "Kunde inte hämta användare", error: err.message })
    }
}

export const uploadProfilePicController = async (req, res) => {
    try{
        // Fetch userId from client, of the user who
        // wants to upload profilePic
        const { userId } = req.body;
        const file = req.file;

        const fileName = `${userId}-${Date.now()}`;

        const { error: uploadError } = await supabase.storage
            // Look in supabase-bucket Avatars
            .from("Avatars")
            // Upload file to bucket
            .upload(fileName, file.buffer, {contentType: file.mimetype });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
            // Fetch public URL we just added, this will be the 
            // URL saved in database
            .from("Avatars")
            .getPublicUrl(fileName);
        
        const { error: updateError } = await supabase
            // Look in table of users
            .from("users")
            // Tell what to update and in what value
            .update({ profilePicURL: urlData.publicUrl })
            // Looks for correct id to update pic for correct user
            .eq("id", userId);

        if (updateError) throw updateError;

        res.json({ profilePicURL: urlData.publicUrl });
    } catch {
        res.satus(500).json({ message: "Uppladdningen misslyckades", error: err.message });
    }
}