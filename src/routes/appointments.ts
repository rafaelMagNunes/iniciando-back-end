import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

// Repopsitories
import AppointmentsRepsitory from '../repositories/AppointmentsRepository';

const appointmentRespository = new AppointmentsRepsitory();

const appointmentsRouter = Router();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentRespository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentRespository.findByDate(
    parsedDate
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = appointmentRespository.create(provider, parsedDate);

  return response.json(appointment);
});

export default appointmentsRouter;
