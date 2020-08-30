import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { ensureStudentAuthenticated } from '../middlewares/ensureRoleAuthenticated';

import StudentInternshipsController from '../controllers/StudentInternshipsController';

const internshipsRouter = Router();

const studentInternshipsController = new StudentInternshipsController();

internshipsRouter.post(
  '/',
  ensureAuthenticated,
  ensureStudentAuthenticated,
  studentInternshipsController.create,
);

export default internshipsRouter;
