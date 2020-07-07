import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { ensureAdminAuthenticated } from '@modules/users/infra/http/middlewares/ensureRoleAuthenticated';

import SchoolsController from '../controllers/SchoolsController';
import AdmRegionSchoolsController from '../controllers/AdmRegionSchoolsController';

const schoolsRouter = Router();
const schoolsController = new SchoolsController();
const admRegionSchoolsController = new AdmRegionSchoolsController();

schoolsRouter.use(ensureAuthenticated);

schoolsRouter.get('/', schoolsController.index);

schoolsRouter.get('/:id', schoolsController.show);

schoolsRouter.get('/adm-regions/:id', admRegionSchoolsController.index);

schoolsRouter.post('/', ensureAdminAuthenticated, schoolsController.create);

schoolsRouter.put('/:id', ensureAdminAuthenticated, schoolsController.update);

export default schoolsRouter;
