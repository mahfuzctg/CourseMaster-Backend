import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { ModuleControllers } from './module.controller';

const router = express.Router();

router.post(
    '/create-module',
    auth(USER_ROLE.admin),
    ModuleControllers.createModule,
);

router.get(
    '/:id',
    auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
    ModuleControllers.getSingleModule,
);

router.patch(
    '/:id',
    auth(USER_ROLE.admin),
    ModuleControllers.updateModule,
);

router.delete(
    '/:id',
    auth(USER_ROLE.admin),
    ModuleControllers.deleteModule,
);

router.get(
    '/',
    auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
    ModuleControllers.getAllModules,
);

export const ModuleRoutes = router;
