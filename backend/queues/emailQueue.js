import { Queue, Worker } from 'bullmq';
import { redisConnect } from '../config/redisConnect.js';

export const emailQueue = new Queue('welcome-email', {
    connection: redisConnect
});

export const emailWorker = new Worker('welcome-email', async job => {
    // resend email format here
}, { connection: redisConnect });