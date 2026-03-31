import { supabase } from "../supabaseClient.js";

export const getConvoByIdController = async (req, res) => {
  const { senderId, receiverId } = req.params;
  try {
    const { data } = await supabase
      .from("conversations")
      .select("*")
      .or(
        `and(sender_id.eq.${senderId},receiver_id.eq.${receiverId}),
         and(sender_id.eq.${receiverId},receiver_id.eq.${senderId})`,
      );
      res.status(200).json({ conversation: data })
  } catch {}
};

export const sendMessageController = async (req, res) => {
  const { senderId, receiverId, message } = req.body;
  try{
    const { data } = await supabase
      .from("conversations")
      .insert({ sender_id: senderId, receiver_id: receiverId, message });
      res.status(201).json({ message: "Meddelande skickat", conversation: data })
  } catch{
    res.status(500).json({ message: "Fel vid skickande av meddelande" })
  }
}
