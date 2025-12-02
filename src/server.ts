import { Server } from 'http';
import app from './app';
import config from './app/config';
import connectDB from './app/DB';

let server: Server;

async function main() {
    try {
        await connectDB();

        server = app.listen(config.port, () => {
            console.log(`🚀 Server is running on port ${config.port}`);
        });
    } catch (err) {
        console.log(err);
    }
}

main();

process.on('unhandledRejection', err => {
    console.log(`😈 unhandledRejection is detected , shutting down ...`, err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});

process.on('uncaughtException', () => {
    console.log(`😈 uncaughtException is detected , shutting down ...`);
    process.exit(1);
});
