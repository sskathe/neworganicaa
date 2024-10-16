import express from 'express';
const router = express.Router();
import { submitRating } from '../controllers/ratingController.js'; // Make sure this is correct

router.post('/submit', submitRating);

export default router; // Ensure you have this line
