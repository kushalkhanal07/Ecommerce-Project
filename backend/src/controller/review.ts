import { Request, Response } from "express";

// In-memory reviews array (replace with DB in production)
const reviews: any[] = [];

// Add review (customer/admin)
export const addReview = async (req: Request, res: Response) => {
  try {
    const { productId, userId, rating, comment } = req.body;
    if (!productId || !userId || !rating) {
      return res.status(400).send({ message: "Missing required fields" });
    }
    const review = {
      id: Date.now(),
      productId,
      userId,
      rating,
      comment: comment || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    reviews.push(review);
    return res
      .status(201)
      .send({ message: "Review added successfully", review });
  } catch (error) {
    return res.status(500).send({ message: "Server error", error });
  }
};

// Update review (customer/admin)
export const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const review = reviews.find((r) => r.id === Number(id));
    if (!review) {
      return res.status(404).send({ message: "Review not found" });
    }
    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;
    review.updatedAt = new Date();
    return res.send({ message: "Review updated successfully", review });
  } catch (error) {
    return res.status(500).send({ message: "Server error", error });
  }
};

// Delete review (customer/admin)
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const index = reviews.findIndex((r) => r.id === Number(id));
    if (index === -1) {
      return res.status(404).send({ message: "Review not found" });
    }
    reviews.splice(index, 1);
    return res.send({ message: "Review deleted successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Server error", error });
  }
};

// Get all reviews for a product
export const getReviews = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productReviews = reviews.filter((r) => r.productId === productId);
    // Only allow viewing reviews (no update for admin)
    return res.send({ reviews: productReviews });
  } catch (error) {
    return res.status(500).send({ message: "Server error", error });
  }
};
