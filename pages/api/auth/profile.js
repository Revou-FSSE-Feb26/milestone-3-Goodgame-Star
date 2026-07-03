export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Accept token from httpOnly cookie or Authorization header (for rehydration)
  const token =
    req.cookies.revoshop_token ||
    req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const profileRes = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await profileRes.json();

    if (!profileRes.ok) {
      return res.status(profileRes.status).json({
        message: data.message || "Failed to fetch profile",
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Profile API error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
