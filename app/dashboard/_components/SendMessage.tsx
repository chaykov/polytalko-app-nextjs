"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export default function SendMessage() {
  const { user } = useUser();
  const sendMessage = useMutation(api.testing.mutations.createMessage);

  const handleSend = async () => {
    if (!user) return;
    await sendMessage({ text: "Testowa wiadomość!", userId: user.id });
    alert("Wiadomość wysłana!");
  };

  return <button onClick={handleSend}>Wyślij testową wiadomość</button>;
}
