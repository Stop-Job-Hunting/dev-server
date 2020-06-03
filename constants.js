const CLIENTURL =
  process.env.NODE_ENV === "production"
    ? "https://dev-client-8f5kvdedt.now.sh"
    : "http://localhost:3000";

export default CLIENTURL;
