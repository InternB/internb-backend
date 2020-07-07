import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import SchoolsController from '../controllers/SchoolsController';

const schoolsRouter = Router();
const schoolsController = new SchoolsController();

schoolsRouter.use(ensureAuthenticated);

schoolsRouter.post('/', schoolsController.create);

export default schoolsRouter;
