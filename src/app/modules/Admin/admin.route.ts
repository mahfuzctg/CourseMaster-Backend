import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.get(
    '/',
    auth(USER_ROLE.admin),
    AdminControllers.getAllAdmins,
);

router.get(
    '/:id',
    auth(USER_ROLE.admin),
    AdminControllers.getSingleAdmin,
);

router.delete(
    '/:id',
    auth(USER_ROLE.admin),
    AdminControllers.deleteAdmin,
);

router.patch(
    '/:id',
    auth(USER_ROLE.admin),
    AdminControllers.updateAdmin,
);

export const AdminRoutes = router;
