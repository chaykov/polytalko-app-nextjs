import { ClientWrapper } from "@/providers/ClientWrapper";
import { ReactNode } from "react";
import NavBar from "../_components/NavBar";

export default function SocialLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <ClientWrapper>
        <NavBar />
        <main className="mx-auto container p-4">{children}</main>
      </ClientWrapper>
    </div>
  );
}
