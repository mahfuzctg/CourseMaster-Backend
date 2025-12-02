import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { ReviewControllers } from './review.controller';

const router = express.Router();

router.post(
    '/create-review',
    auth(USER_ROLE.student),
    ReviewControllers.createReview,
);

router.get(
    '/:id',
    auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
    ReviewControllers.getSingleReview,
);

router.patch(
    '/:id',
    auth(USER_ROLE.admin, USER_ROLE.faculty),
    ReviewControllers.updateReview,
);

router.delete(
    '/:id',
    auth(USER_ROLE.admin),
    ReviewControllers.deleteReview,
);

router.get(
    '/',
    auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
    ReviewControllers.getAllReviews,
);

export const ReviewRoutes = router;
