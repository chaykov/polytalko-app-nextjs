// Obsługuje edycję danych uzytkownika

import { api } from "@/convex/_generated/api";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "convex/react";
import { useEffect, useRef } from "react";

export default function ProfileForm({ userProfile, userId, setIsLoaded }: any) {
  // Aktualizowanie zmiany profila
  const updateProfile = useMutation(api.mutations.users.updateUserProfile);

  // **useRef** przechowuje wartości profilu, zamiast 'useState'
  const profileRef = useRef({
    name: "",
    country: "",
    age: "",
    description: "",
  });

  // Aktualizacja wartosci w useRef po załadowaniu 'userProfule'
  useEffect(() => {
    if (userProfile) {
      profileRef.current = {
        name: userProfile.name || "",
        country: userProfile.country || "",
        age: userProfile.age?.toString() || "",
        description: userProfile.description || "",
      };
      setIsLoaded(true);
    }
  }, [userProfile]);

  // Aktualizacja profilu po kliknięciu "Update profile"
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    try {
      await updateProfile({
        userId,
        name: profileRef.current.name || "",
        country: profileRef.current.country || "",
        age: profileRef.current.age
          ? Number(profileRef.current.age)
          : undefined,
        description: profileRef.current.description,
      });
      toast({ description: "Profile updated successfully!" });
    } catch (error) {
      toast({ description: "Error updating profile!", variant: "destructive" });
      console.error("Error updating profile:", error);
    }
  };

  return (
    <form
      onSubmit={handleUpdateProfile}
      className="flex flex-col space-y-1 items-center"
    >
      <label className="inline-block mr-1 font-semibold">Name:</label>
      <input
        onChange={(e) => (profileRef.current.name = e.target.value)}
        defaultValue={profileRef.current.name}
        type="text"
        className="border w-48"
      />

      <label className="inline-block mr-1 font-semibold">Country:</label>
      <input
        onChange={(e) => (profileRef.current.country = e.target.value)}
        defaultValue={profileRef.current.country}
        type="text"
        className="border w-48"
      />

      <label className="inline-block mr-1 font-semibold">Age:</label>
      <input
        onChange={(e) => (profileRef.current.age = e.target.value)}
        defaultValue={profileRef.current.age}
        type="number"
        className="border w-48"
      />

      <label className="inline-block mr-1 font-semibold">Description:</label>
      <textarea
        onChange={(e) => (profileRef.current.description = e.target.value)}
        defaultValue={profileRef.current.description}
        className="border w-48"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Update profile
      </button>
    </form>
  );
}
