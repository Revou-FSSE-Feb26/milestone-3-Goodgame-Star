export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Clear both cookies server-side
  res.setHeader("Set-Cookie", [
    "revoshop_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict",
    "revoshop_role=; Path=/; Max-Age=0; SameSite=Strict",
  ]);

  return res.status(200).json({ message: "Logged out successfully" });
}
