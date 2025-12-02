import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: config.env === 'production',
        auth: {
            user: config.email.user,
            pass: config.email.pass,
        },
    });

    await transporter.sendMail({
        from: config.email.user,
        to,
        subject: 'Reset your password within ten mins!',
        text: '',
        html,
    });
};
