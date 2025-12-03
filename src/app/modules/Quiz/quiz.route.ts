import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { QuizControllers } from './quiz.controller';

const router = express.Router();

router.post(
    '/create-quiz',
    auth(USER_ROLE.admin),
    QuizControllers.createQuiz,
);

router.get(
    '/:id',
    auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
    QuizControllers.getSingleQuiz,
);

router.patch(
    '/:id',
    auth(USER_ROLE.admin),
    QuizControllers.updateQuiz,
);

router.delete(
    '/:id',
    auth(USER_ROLE.admin),
    QuizControllers.deleteQuiz,
);

router.get(
    '/',
    auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
    QuizControllers.getAllQuizzes,
);

export const QuizRoutes = router;
