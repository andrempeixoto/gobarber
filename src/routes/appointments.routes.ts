import { Router } from 'express';
import { uuid } from 'uuidv4';

const appointmentsRouter = Router();

const appointments = [];

// 'http://localhost:3330/appointments' is the root address of this route
// as pointed in the index.ts file as "routes.use('/appointments', appointmentsRouter);"

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const appointment = {
    id: uuid(),
    provider,
    date,
  };

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
