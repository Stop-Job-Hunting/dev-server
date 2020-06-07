const CLIENTURL =
  process.env.NODE_ENV === "production"
    ? "https://stopjobhunting.com"
    : "http://localhost:3000";

export default CLIENTURL;
