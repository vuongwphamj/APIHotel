import { Router } from 'express';
import * as RatingController from '../controllers/rating.controller';
const router = new Router();
const authMiddleWare = require('./../controllers/config/jwt');

// Get Recommandation
router.get('/:userId', RatingController.getRecommendation);

// Put Rating
router.post('/:userId/:hotelId/:ratingNumber', RatingController.postRatingHotel);

export default router;
