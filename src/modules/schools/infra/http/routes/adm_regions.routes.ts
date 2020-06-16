import { Router } from 'express';

import AdmRegionsController from '../controllers/AdmRegionsController';

const admRegionsRouter = Router();
const admRegionsController = new AdmRegionsController();

admRegionsRouter.post('/', admRegionsController.create);

export default admRegionsRouter;
