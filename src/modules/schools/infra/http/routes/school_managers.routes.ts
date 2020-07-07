import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import SchoolManagersController from '../controllers/SchoolManagersController';

const schoolManagersRouter = Router();
const schoolManagersController = new SchoolManagersController();

schoolManagersRouter.use(ensureAuthenticated);

schoolManagersRouter.post('/', schoolManagersController.create);

export default schoolManagersRouter;
