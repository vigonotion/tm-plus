import { conn } from "@/conn.ts";

export function useAuth() {
  const isValid = conn.authStore.isValid;
  const email = conn.authStore.model?.email;

  return { isLoggedIn: isValid, email };
}
