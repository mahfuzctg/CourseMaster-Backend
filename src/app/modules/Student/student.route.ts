import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.get(
    '/',
    auth(USER_ROLE.admin),
    StudentControllers.getAllStudents,
);

router.get(
    '/:id',
    auth(USER_ROLE.admin, USER_ROLE.faculty),
    StudentControllers.getSingleStudent,
);

router.delete(
    '/:id',
    auth(USER_ROLE.admin),
    StudentControllers.deleteStudent,
);

router.patch(
    '/:id',
    auth(USER_ROLE.admin),
    StudentControllers.updateStudent,
);

export const StudentRoutes = router;
