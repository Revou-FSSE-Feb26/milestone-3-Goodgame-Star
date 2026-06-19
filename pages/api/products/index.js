const API_BASE = "https://api.escuelajs.co/api/v1/products";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const apiRes = await fetch(`${API_BASE}?limit=50`);
      const data = await apiRes.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error("Fetch products error:", error);
      return res.status(500).json({ message: "Failed to fetch products" });
    }
  }

  if (req.method === "POST") {
    const { title, price, description, categoryId, images } = req.body;

    // Validate required fields
    if (!title || !price || !description || !categoryId) {
      return res.status(400).json({
        message: "Title, price, description, and categoryId are required",
      });
    }

    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({ message: "Price must be a positive number" });
    }

    try {
      const apiRes = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          price,
          description,
          categoryId,
          images: images || ["https://placehold.co/400x300?text=New+Product"],
        }),
      });

      const data = await apiRes.json();

      if (!apiRes.ok) {
        return res.status(apiRes.status).json({
          message: data.message || "Failed to create product",
        });
      }

      return res.status(201).json(data);
    } catch (error) {
      console.error("Create product error:", error);
      return res.status(500).json({ message: "Failed to create product" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
