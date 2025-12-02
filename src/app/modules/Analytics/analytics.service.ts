import { Course } from '../Course/course.model';
import { Enrollment } from '../Enrollment/enrollment.model';
import { Student } from '../Student/student.model';

const getAnalyticsFromDB = async () => {
    const totalStudents = await Student.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();

    const mostPopularCourse = await Enrollment.aggregate([
        {
            $group: {
                _id: '$course',
                count: { $sum: 1 },
            },
        },
        {
            $sort: { count: -1 },
        },
        {
            $limit: 1,
        },
        {
            $lookup: {
                from: 'courses',
                localField: '_id',
                foreignField: '_id',
                as: 'course',
            },
        },
        {
            $unwind: '$course',
        },
        {
            $project: {
                _id: 0,
                courseTitle: '$course.title',
                enrollmentCount: '$count',
            },
        },
    ]);

    return {
        totalStudents,
        totalCourses,
        totalEnrollments,
        mostPopularCourse: mostPopularCourse[0] || null,
    };
};

export const AnalyticsServices = {
    getAnalyticsFromDB,
};
