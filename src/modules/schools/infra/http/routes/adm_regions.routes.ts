import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AdmRegionsController from '../controllers/AdmRegionsController';

const admRegionsRouter = Router();
const admRegionsController = new AdmRegionsController();

admRegionsRouter.use(ensureAuthenticated);

admRegionsRouter.get('/', admRegionsController.index);

admRegionsRouter.post('/', admRegionsController.create);

export default admRegionsRouter;
