import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { ensureAdminAuthenticated } from '@modules/users/infra/http/middlewares/ensureRoleAuthenticated';

import SchoolManagersController from '../controllers/SchoolManagersController';

const schoolManagersRouter = Router();
const schoolManagersController = new SchoolManagersController();

schoolManagersRouter.use(ensureAuthenticated);

schoolManagersRouter.post(
  '/',
  ensureAdminAuthenticated,
  schoolManagersController.create,
);

schoolManagersRouter.get('/:id', schoolManagersController.show);

schoolManagersRouter.put(
  '/:id',
  ensureAdminAuthenticated,
  schoolManagersController.update,
);

export default schoolManagersRouter;
