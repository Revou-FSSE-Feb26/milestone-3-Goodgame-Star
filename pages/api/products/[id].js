const API_BASE = "https://api.escuelajs.co/api/v1/products";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const apiRes = await fetch(`${API_BASE}/${id}`);
      const data = await apiRes.json();

      if (!apiRes.ok) {
        return res.status(apiRes.status).json({
          message: data.message || "Product not found",
        });
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error("Fetch product error:", error);
      return res.status(500).json({ message: "Failed to fetch product" });
    }
  }

  if (req.method === "PUT") {
    const { title, price, description, categoryId, images } = req.body;

    // Validate
    if (!title || price === undefined || !description) {
      return res.status(400).json({
        message: "Title, price, and description are required",
      });
    }

    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({ message: "Price must be a positive number" });
    }

    try {
      const updateBody = { title, price, description };
      if (categoryId) updateBody.categoryId = categoryId;
      if (images) updateBody.images = images;

      const apiRes = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateBody),
      });

      const data = await apiRes.json();

      if (!apiRes.ok) {
        return res.status(apiRes.status).json({
          message: data.message || "Failed to update product",
        });
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error("Update product error:", error);
      return res.status(500).json({ message: "Failed to update product" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const apiRes = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
      });

      const data = await apiRes.json();

      if (!apiRes.ok) {
        return res.status(apiRes.status).json({
          message: data.message || "Failed to delete product",
        });
      }

      return res.status(200).json({ message: "Product deleted successfully", ...data });
    } catch (error) {
      console.error("Delete product error:", error);
      return res.status(500).json({ message: "Failed to delete product" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
