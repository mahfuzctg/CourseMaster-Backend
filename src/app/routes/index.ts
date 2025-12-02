import { Router } from 'express';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { AnalyticsRoutes } from '../modules/Analytics/analytics.route';
import { AssignmentRoutes } from '../modules/Assignment/assignment.route';
import { ReviewRoutes } from '../modules/AssignmentReview/review.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { BatchRoutes } from '../modules/Batch/batch.route';
import { CourseRoutes } from '../modules/Course/course.route';
import { EnrollmentRoutes } from '../modules/Enrollment/enrollment.route';
import { LessonRoutes } from '../modules/Lesson/lesson.route';
import { ModuleRoutes } from '../modules/Module/module.route';
import { ProgressRoutes } from '../modules/Progress/progress.route';
import { QuizRoutes } from '../modules/Quiz/quiz.route';
import { QuizSubmissionRoutes } from '../modules/QuizSubmission/quizSubmission.route';
import { RatingRoutes } from '../modules/Rating/rating.route';
import { StudentRoutes } from '../modules/Student/student.route'; 
import { UserRoutes } from '../modules/User/user.route';

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/students',
        route: StudentRoutes,
    },
    {
        path: '/admins',
        route: AdminRoutes,
    },
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/courses',
        route: CourseRoutes,
    },
    {
        path: '/modules',
        route: ModuleRoutes,
    },
    {
        path: '/lessons',
        route: LessonRoutes,
    },
    {
        path: '/batches',
        route: BatchRoutes,
    },
    {
        path: '/enrollments',
        route: EnrollmentRoutes,
    },
    {
        path: '/assignments',
        route: AssignmentRoutes,
    },
    {
        path: '/reviews',
        route: ReviewRoutes,
    },
    {
        path: '/quizzes',
        route: QuizRoutes,
    },
    {
        path: '/quiz-submissions',
        route: QuizSubmissionRoutes,
    },
    {
        path: '/progress',
        route: ProgressRoutes,
    },
    {
        path: '/ratings',
        route: RatingRoutes,
    },
    {
        path: '/analytics',
        route: AnalyticsRoutes,
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
