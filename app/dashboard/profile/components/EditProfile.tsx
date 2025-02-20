"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useState } from "react";

interface UserProfile {
  name: string;
  country: string;
  age: number;
  description: string;
  clerkId: string;
}

export default function EditProfile({
  userProfile,
}: {
  userProfile: UserProfile;
}) {
  const updateUserProfile = useMutation(api.mutations.users.updateUserProfile);

  const [form, setForm] = useState({
    name: userProfile?.name || "",
    country: userProfile?.country || "",
    age: userProfile?.age || "",
    description: userProfile?.description || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await updateUserProfile({
      clerkId: userProfile.clerkId,
      name: form.name,
      country: form.country,
      age: form.age ? Number(form.age) : undefined,
      description: form.description,
    });

    alert("Profile is updated!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-2">Edytuj profil</h2>

      <label className="block">Imię:</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-2 mb-2"
      />

      <label className="block">Kraj:</label>
      <input
        type="text"
        name="country"
        value={form.country}
        onChange={handleChange}
        className="w-full border p-2 mb-2"
      />

      <label className="block">Wiek:</label>
      <input
        type="number"
        name="age"
        value={form.age}
        onChange={handleChange}
        className="w-full border p-2 mb-2"
      />

      <label className="block">Opis:</label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        className="w-full border p-2 mb-2"
      />

      <button type="submit" className="w-full bg-blue-500 text-white p-2 mt-2">
        Zapisz zmiany
      </button>
    </form>
  );
}
