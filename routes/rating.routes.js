import { Router } from 'express';
import * as RatingController from '../controllers/rating.controller';
const router = new Router();
const authMiddleWare = require('./../controllers/config/jwt');

// Get Recommandation
router.get('/', authMiddleWare.verify, RatingController.getRecommendation);

// Put Rating
router.post('/:hotelId/:ratingNumber', authMiddleWare.verify, RatingController.postRatingHotel);

export default router;
