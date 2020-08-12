import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { ensureAdminAuthenticated } from '@modules/users/infra/http/middlewares/ensureRoleAuthenticated';

import DisciplinesController from '../controllers/DisciplinesController';

const disciplinesRouter = Router();
const disciplinesController = new DisciplinesController();

disciplinesRouter.use(ensureAuthenticated);

disciplinesRouter.get('/', disciplinesController.index);

disciplinesRouter.post(
  '/',
  ensureAdminAuthenticated,
  disciplinesController.create,
);

export default disciplinesRouter;
