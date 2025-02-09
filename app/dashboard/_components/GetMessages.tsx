"use client";

import { useQuery } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";

export default function UserMessages() {
  const { user } = useUser();
  const message = useQuery(
    api.testing.queries.getMessages,
    user ? { userId: user.id } : "skip"
  );

  console.log("Odebrane wiadomości:", message); // SPRAWDZAMY CO ODBIERA

  if (!message) return <p>Ładowanie...</p>;

  return (
    <div>
      <h2>Twoje wiadomości</h2>
      <ul>
        {message.map((msg) => (
          <li key={msg._id}>
            {msg.text} <br />
            <small>Wysłane: {new Date(msg.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
