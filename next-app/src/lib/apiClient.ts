import { useAuthStore } from "@/store/authStore";

/**
 * Drop-in fetch replacement that automatically attaches the JWT Bearer token
 * from the Zustand auth store. Safe to call outside React components because
 * it uses getState() (synchronous) rather than the useAuthStore hook.
 */
export function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = useAuthStore.getState().accessToken;
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string> | undefined),
    },
  });
}
