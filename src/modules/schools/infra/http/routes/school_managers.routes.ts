import { Router } from 'express';

import SchoolManagersController from '../controllers/SchoolManagersController';

const schoolManagersRouter = Router();
const schoolManagersController = new SchoolManagersController();

schoolManagersRouter.post('/', schoolManagersController.create);

export default schoolManagersRouter;
