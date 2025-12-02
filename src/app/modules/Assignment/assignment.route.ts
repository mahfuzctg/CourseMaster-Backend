import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { AssignmentControllers } from './assignment.controller';

const router = express.Router();

router.post(
    '/create-assignment',
    auth(USER_ROLE.admin),
    AssignmentControllers.createAssignment,
);

router.get(
    '/:id',
    auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
    AssignmentControllers.getSingleAssignment,
);

router.patch(
    '/:id',
    auth(USER_ROLE.admin),
    AssignmentControllers.updateAssignment,
);

router.delete(
    '/:id',
    auth(USER_ROLE.admin),
    AssignmentControllers.deleteAssignment,
);

router.get(
    '/',
    auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
    AssignmentControllers.getAllAssignments,
);

export const AssignmentRoutes = router;
