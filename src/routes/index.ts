import { Router } from 'express';

// Routes
import appointmentsRouter from './appointments';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

export default routes;
