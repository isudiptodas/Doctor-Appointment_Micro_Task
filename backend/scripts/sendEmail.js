import cron from 'node-cron';
import { Booking } from '../models/Booking.js';
import { emailQueue } from '../queues/emailQueue.js';

export const runAppointmentCheck = async () => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    try {
        const todayAppointments = await Booking.find({
            appointmentDate: { $gte: startOfToday, $lte: endOfToday }
        });

        if (todayAppointments && todayAppointments.length > 0) {
            for (const booking of todayAppointments) {
                await emailQueue.add('appointment-today', {
                    name: booking.patientName,
                    doctorName: booking.doctorName,
                    time: booking.timeSlot,
                }, {
                    attempts: 3,
                    backoff: {
                        type: 'exponential',
                        delay: 1000
                    }
                });
            }
        }

    } catch (err) {
        console.log(err);
    }
}

cron.schedule("0 0 * * *", () => {
    runAppointmentCheck();
}, {
    timezone: "Asia/Kolkata"
});