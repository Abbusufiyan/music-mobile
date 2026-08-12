/**
 * API base URL for frontend requests.
 * - Dev: defaults to http://localhost:5000
 * - Production (same server): empty string → relative /api/... paths
 * - Production (split deploy): set VITE_API_URL=https://your-backend.com at build time
 */
const envUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "";

export const API_BASE = envUrl || (import.meta.env.DEV ? "http://localhost:5000" : "");

export function apiUrl(path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${normalized}`;
}

export function resolveAudioUrl(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return apiUrl(url);
}
