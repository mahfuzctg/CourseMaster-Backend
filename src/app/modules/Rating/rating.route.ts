import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { RatingControllers } from './rating.controller';

const router = express.Router();

router.post(
    '/create-rating',
    auth(USER_ROLE.student),
    RatingControllers.createRating,
);

router.get(
    '/:courseId/average-rating',
    RatingControllers.getAverageRating,
);

router.get(
    '/',
    RatingControllers.getAllRatings,
);

export const RatingRoutes = router;
