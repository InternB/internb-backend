import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { ensureAdminAuthenticated } from '@modules/users/infra/http/middlewares/ensureRoleAuthenticated';

import AdmRegionsController from '../controllers/AdmRegionsController';

const admRegionsRouter = Router();
const admRegionsController = new AdmRegionsController();

admRegionsRouter.use(ensureAuthenticated);

admRegionsRouter.get('/', admRegionsController.index);

admRegionsRouter.post(
  '/',
  ensureAdminAuthenticated,
  admRegionsController.create,
);

export default admRegionsRouter;
