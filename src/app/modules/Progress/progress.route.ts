import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { ProgressControllers } from './progress.controller';

const router = express.Router();

router.post(
    '/update-progress',
    auth(USER_ROLE.student),
    ProgressControllers.updateProgress,
);

router.get(
    '/my-progress',
    auth(USER_ROLE.student),
    ProgressControllers.getMyProgress,
);

export const ProgressRoutes = router;
