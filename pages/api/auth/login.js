export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const loginRes = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const loginData = await loginRes.json();

    if (!loginRes.ok) {
      return res.status(loginRes.status).json({
        message: loginData.message || "Invalid email or password",
      });
    }

    const { access_token } = loginData;

    // Fetch profile server-side so the token is never exposed in the browser network tab
    const profileRes = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!profileRes.ok) {
      return res.status(500).json({ message: "Failed to fetch user profile" });
    }

    const profileData = await profileRes.json();

    // Set httpOnly cookie to protect token from XSS attacks
    res.setHeader("Set-Cookie", [
      `revoshop_token=${access_token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`,
      `revoshop_role=${profileData.role}; Path=/; Max-Age=86400; SameSite=Strict`,
    ]);

    return res.status(200).json({ access_token, user: profileData });
  } catch (error) {
    console.error("Login API error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
