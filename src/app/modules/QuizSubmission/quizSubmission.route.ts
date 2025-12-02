import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { QuizSubmissionControllers } from './quizSubmission.controller';

const router = express.Router();

router.post(
    '/create-quiz-submission',
    auth(USER_ROLE.student),
    QuizSubmissionControllers.createQuizSubmission,
);

router.get(
    '/:id',
    auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
    QuizSubmissionControllers.getSingleQuizSubmission,
);

router.patch(
    '/:id',
    auth(USER_ROLE.admin),
    QuizSubmissionControllers.updateQuizSubmission,
);

router.delete(
    '/:id',
    auth(USER_ROLE.admin),
    QuizSubmissionControllers.deleteQuizSubmission,
);

router.get(
    '/',
    auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
    QuizSubmissionControllers.getAllQuizSubmissions,
);

export const QuizSubmissionRoutes = router;
