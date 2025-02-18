import crypto from "crypto";

// 📌 Funkcja do generowania URL do Gravatar
export function getGravatarUrl(email?: string, size: number = 100): string {
  if (!email) {
    return `https://www.gravatar.com/avatar/?s=${size}&d=retro`; // Domyślny avatar
  }
  const hash = crypto
    .createHash("md5")
    .update(email.trim().toLowerCase())
    .digest("hex");
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}
