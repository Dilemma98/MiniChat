import { supabase } from "../supabaseClient.js";

export const getConvoByIdController = async (req, res) => {
  const { senderId, receiverId } = req.params;
  try {
    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .or(
        `and(sender_id.eq.${senderId},receiver_id.eq.${receiverId}), and(sender_id.eq.${receiverId},receiver_id.eq.${senderId})`,
      );
      res.status(200).json({ conversation: data })
      console.log("Data:", data, "Error:", error);
  } catch {
    console.log("Error:", error);
  }
};

export const sendMessageController = async (senderId, receiverId, message, userName) => {
  try{
    const { data, error } = await supabase
      .from("conversations")
      .insert({ sender_id: senderId, receiver_id: receiverId, message });
    console.log("Saved message:", data, error);
  } catch(err){
    console.log("Error:", err);
  }
}
