"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const profileSchema = z.object({
  name: z
    .string()
    .min(1, "Name requires at least 1 character")
    .max(50, "Name is too long"),
  bio: z.string().max(200, "Bio is too long").optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function EditProfilePage() {
  const { isSignedIn, isLoaded, user } = useUser();
  const updateProfile = useMutation(api.mutations.updateUserProfile);
  const userProfile = useQuery(
    api.queries.getUserProfile,
    isSignedIn && user ? { userId: user.id } : "skip"
  );
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userProfile?.name || "",
      bio: userProfile?.bio || "",
    },
  });

  useEffect(() => {
    if (userProfile) {
      reset({
        name: userProfile.name,
        bio: userProfile.bio || "",
      });
    }
  }, [userProfile, reset]);

  if (!isLoaded || !isSignedIn || !user) {
    return <p>Loading or no authorization...</p>;
  }

  const onSubmit = async (data: ProfileForm) => {
    try {
      await updateProfile({
        clerkId: user.id,
        name: data.name,
        bio: data.bio,
      });
      router.push("/social/profile");
    } catch (error) {
      console.error("Error update profile:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Edit profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white border p-6">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input className="w-full p-2 mt-1 border" {...register("name")} />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Bio</label>
          <textarea
            className="w-full p-2 mt-1 border"
            rows={3}
            {...register("bio")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-600"
          type="submit"
        >
          Save edit
        </button>
      </form>
    </div>
  );
}
