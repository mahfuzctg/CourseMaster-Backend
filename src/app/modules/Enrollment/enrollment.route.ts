import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { EnrollmentControllers } from './enrollment.controller';

const router = express.Router();

router.post(
    '/create-enrollment',
    auth(USER_ROLE.admin),
    EnrollmentControllers.createEnrollment,
);

router.get(
    '/:id',
    auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
    EnrollmentControllers.getSingleEnrollment,
);

router.patch(
    '/:id',
    auth(USER_ROLE.admin),
    EnrollmentControllers.updateEnrollment,
);

router.delete(
    '/:id',
    auth(USER_ROLE.admin),
    EnrollmentControllers.deleteEnrollment,
);

router.get(
    '/',
    auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
    EnrollmentControllers.getAllEnrollments,
);

export const EnrollmentRoutes = router;
