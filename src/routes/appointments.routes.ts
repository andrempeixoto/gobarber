import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

// Typescript. Using interface to define a type of an object (not a simple info)
interface Appointments {
  id: string;
  provider: string;
  date: Date;
}

const appointments: Appointments[] = [];

// 'http://localhost:3330/appointments' is the root address of this route
// as pointed in the index.ts file as "routes.use('/appointments', appointmentsRouter);"

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));
  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  ); // .find method returns a boolean

  if (findAppointmentInSameDate) {
    return response.status(400).json({ message: 'This time is already taken' });
  }

  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate,
  };

  appointments.push(appointment);
  return response.json(appointment);
});

export default appointmentsRouter;
