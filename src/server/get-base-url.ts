export const getBaseUrl = (): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const vercelUrl = process.env.VERCEL_URL;

  if (baseUrl !== undefined) {
    return baseUrl;
  }

  if (vercelUrl !== undefined) {
    return `https://${vercelUrl}`;
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "http://localhost:3000";
};
