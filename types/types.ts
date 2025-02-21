export interface UserProfile {
  name: string;
  country: string;
  age: number;
  description: string;
  clerkId: string;
  status: "online" | "offline";
}
