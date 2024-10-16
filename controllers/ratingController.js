// ratingController.js
import orderModel from "../models/orderModel.js";

// In your rating controller (ratingController.js or orderController.js)
const submitRating = async (req, res) => {
    const { orderId, rating } = req.body;

    if (!orderId || !rating) {
        return res.status(400).json({ success: false, message: "Order ID and rating are required." });
    }

    try {
        // Find the order and update the rating field
        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { rating }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found." });
        }

        res.json({ success: true, message: "Rating submitted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error." });
    }
};


export { submitRating };
