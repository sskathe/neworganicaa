import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
    const { userId, item } = req.body; // Assume the item structure is already defined

    try {
        // Find user by ID
        const user = await userModel.findById(userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Check if cartData exists, if not, initialize it
        if (!user.cartData) {
            user.cartData = [];
        }

        // Add item to cartData
        user.cartData.push(item);
        
        // Save updated user
        await user.save();

        res.json({ success: true, message: "Item added to cart", cartData: user.cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding to cart." });
    }
};

// Remove food from user cart
const removeFromCart = async (req, res) => {
   const { userId, itemId } = req.body;

   try {
      const userData = await userModel.findById(userId);
      let cartData = userData.cartData;

      // Check if item exists in cart and has a quantity greater than 0
      if (cartData[itemId] && cartData[itemId] > 0) {
         cartData[itemId] -= 1;

         await userModel.findByIdAndUpdate(userId, { cartData });
         res.json({ success: true, message: "Removed From Cart" });
      } else {
         res.status(400).json({ success: false, message: "Item not in cart or invalid quantity" });
      }
   } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ success: false, message: "Error removing from cart" });
   }
};
const getCart = async (req, res) => {
   const { userId } = req.params; // Assuming userId is passed as a URL parameter

   try {
       // Find user by ID
       const user = await userModel.findById(userId);
       
       if (!user) {
           return res.status(404).json({ success: false, message: "User not found." });
       }

       // Check if cartData exists
       const cartData = user.cartData || []; // Initialize to empty array if undefined
       res.json({ success: true, cartData });
   } catch (error) {
       console.error(error);
       res.status(500).json({ success: false, message: "Error retrieving cart." });
   }
};


export { addToCart, removeFromCart, getCart };
