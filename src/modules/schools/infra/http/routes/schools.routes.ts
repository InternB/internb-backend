import { Router } from 'express';

import SchoolsController from '../controllers/SchoolsController';

const schoolsRouter = Router();
const schoolsController = new SchoolsController();

schoolsRouter.post('/', schoolsController.create);

export default schoolsRouter;
