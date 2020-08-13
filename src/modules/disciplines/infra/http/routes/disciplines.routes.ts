import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

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
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().min(5).max(10),
      name: Joi.string().min(8).max(50),
    },
  }),
  disciplinesController.create,
);

export default disciplinesRouter;
