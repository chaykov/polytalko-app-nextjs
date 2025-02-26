"use client";

import NavBar from "../../../components/NavBar";

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="mx-auto container p-4">{children}</main>
    </div>
  );
}
