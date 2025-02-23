import { z } from "zod";

export const userSchema = z.object({
  clerkId: z.string().min(1, "clerkId jest wymagany"),
  name: z.string().min(1, "Imię jest wymagane").optional(),
  email: z.string().email("Niepoprawny email").optional(),
  country: z.string().optional(), // Opcjonalne
  age: z.number().min(0, "Wiek musi być większy niż 0").optional(), // Opcjonalne
  description: z.string().optional(),
  status: z.enum(["online", "offline"]).optional(), // Opcjonalne
  lastActive: z.number().optional(),
});
