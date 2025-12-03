import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { LessonControllers } from './lesson.controller';

const router = express.Router();

router.post(
    '/create-lesson',
    auth(USER_ROLE.admin),
    LessonControllers.createLesson,
);

router.get(
    '/:id',
    auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
    LessonControllers.getSingleLesson,
);

router.patch(
    '/:id',
    auth(USER_ROLE.admin),
    LessonControllers.updateLesson,
);

router.delete(
    '/:id',
    auth(USER_ROLE.admin),
    LessonControllers.deleteLesson,
);

router.get(
    '/',
    auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
    LessonControllers.getAllLessons,
);

export const LessonRoutes = router;