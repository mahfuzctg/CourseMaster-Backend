import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { BatchControllers } from './batch.controller';

const router = express.Router();

router.post(
    '/create-batch',
    auth(USER_ROLE.admin),
    BatchControllers.createBatch,
);

router.get(
    '/:id',
    auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
    BatchControllers.getSingleBatch,
);

router.patch(
    '/:id',
    auth(USER_ROLE.admin),
    BatchControllers.updateBatch,
);

router.delete(
    '/:id',
    auth(USER_ROLE.admin),
    BatchControllers.deleteBatch,
);

router.get(
    '/',
    auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
    BatchControllers.getAllBatches,
);

export const BatchRoutes = router;
