export const CLIENTURL =
  process.env.NODE_ENV === "production"
    ? "https://stopjobhunting.com"
    : "http://localhost:3000";

export const COOKIEURL =
  process.env.NODE_ENV === "production" ? "stopjobhunting.com" : "localhost";
