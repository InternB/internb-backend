import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { ensurePreceptorAuthenticated } from '@modules/users/infra/http/middlewares/ensureRoleAuthenticated';
import PreceptorsController from '../controllers/PreceptorsController';

const preceptorsRouter = Router();

const preceptorsController = new PreceptorsController();

preceptorsRouter.use(ensureAuthenticated);

preceptorsRouter.get(
  '/school/:school_id',
  preceptorsController.listPreceptorsOfSchool,
);

preceptorsRouter.patch(
  '/school/:school_id',
  ensurePreceptorAuthenticated,
  preceptorsController.registerToSchool,
);

export default preceptorsRouter;
