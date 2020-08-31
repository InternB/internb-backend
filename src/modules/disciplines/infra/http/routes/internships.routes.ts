import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import pdfsUpload from '@config/uploadsConfig/PdfGuideUpload';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import { ensureStudentAuthenticated } from '../../../../users/infra/http/middlewares/ensureRoleAuthenticated';

import InternshipsController from '../controllers/InternshipsController';

const internshipsRouter = Router();

const internshipsController = new InternshipsController();

internshipsRouter.use(ensureAuthenticated);

internshipsRouter.post(
  '/',
  ensureStudentAuthenticated,
  celebrate({
    [Segments.BODY]: {
      class_id: Joi.string().required(),
      password: Joi.string().min(6).max(12).required(),
    },
  }),
  internshipsController.create,
);

internshipsRouter.patch(
  '/:id/school/:school_id',
  ensureStudentAuthenticated,
  internshipsController.registerStudentToSchool,
);

internshipsRouter.patch(
  '/compromise/:internship_id',
  ensureStudentAuthenticated,
  pdfsUpload.upload.single('compromise'),
  internshipsController.uploadStudentCompromise,
);

internshipsRouter.patch(
  '/contract/:internship_id',
  ensureStudentAuthenticated,
  pdfsUpload.upload.fields([
    {
      name: 'firstCopy',
      maxCount: 1,
    },
    {
      name: 'secondCopy',
      maxCount: 1,
    },
    {
      name: 'thirdCopy',
      maxCount: 1,
    },
  ]),
  internshipsController.uploadStudentContract,
);

internshipsRouter.patch(
  '/work-plan/:internship_id',
  ensureStudentAuthenticated,
  pdfsUpload.upload.single('work-plan'),
  internshipsController.uploadStudentWorkPlan,
);

export default internshipsRouter;
