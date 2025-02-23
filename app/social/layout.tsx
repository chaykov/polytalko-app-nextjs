import { ClientWrapper } from "@/providers/ClientWrapper";
import { ReactNode } from "react";
import NavBar from "../_components/NavBar";

export default function SocialLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <ClientWrapper>
        <NavBar />
        <main className="container p-4">{children}</main>
      </ClientWrapper>
    </div>
  );
}
