import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profilesRouter from '@modules/users/infra/http/routes/profiles.routes';

import schoolsRouter from '@modules/schools/infra/http/routes/schools.routes';
import schoolManagersRouter from '@modules/schools/infra/http/routes/school_managers.routes';
import admRegionsRouter from '@modules/schools/infra/http/routes/adm_regions.routes';

import disciplinesRouter from '@modules/disciplines/infra/http/routes/disciplines.routes';
import classesRouter from '@modules/disciplines/infra/http/routes/classes.routes';
import internshipsRouter from '@modules/disciplines/infra/http/routes/internships.routes';
import assessmentsRouter from '@modules/disciplines/infra/http/routes/assessments.routes';
import preceptorsRouter from '@modules/users/infra/http/routes/preceptors.routes';
import activitiesRouter from '@modules/disciplines/infra/http/routes/activities.routes';
import realizationsRouter from '@modules/disciplines/infra/http/routes/realizations.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/passwords', passwordRouter);
routes.use('/profiles', profilesRouter);
routes.use('/preceptors', preceptorsRouter);

routes.use('/schools', schoolsRouter);
routes.use('/school-managers', schoolManagersRouter);
routes.use('/adm-regions', admRegionsRouter);

routes.use('/disciplines', disciplinesRouter);
routes.use('/classes', classesRouter);
routes.use('/internships', internshipsRouter);
routes.use('/assessments', assessmentsRouter);
routes.use('/activities', activitiesRouter);
routes.use('/realizations', realizationsRouter);

export default routes;
