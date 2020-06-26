import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { internshipDocsUpload } from '@config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UsersController from '../controllers/UsersController';
import StudentIntershipContractsController from '../controllers/StudentIntershipContractsController';

const usersRouter = Router();
const usersController = new UsersController();
const studentIntershipContractsController = new StudentIntershipContractsController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      cpf: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      fullname: Joi.string().required(),
      phone: Joi.string().optional(),
      role: Joi.number().min(0).max(3).required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/:id/contract-files',
  ensureAuthenticated,
  internshipDocsUpload.upload.fields([
    {
      name: 'commitmentTerm',
      maxCount: 1,
    },
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
  studentIntershipContractsController.update,
);

export default usersRouter;
