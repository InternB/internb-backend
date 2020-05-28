import { Router } from 'express';

import ForgotPasswordsController from '../controllers/ForgotPasswordsController';
import ResetPasswordsController from '../controllers/ResetPasswordsController';

const passwordRouter = Router();
const forgotPasswordsController = new ForgotPasswordsController();
const resetPasswordsController = new ResetPasswordsController();

passwordRouter.post('/forgot', forgotPasswordsController.create);
passwordRouter.post('/reset', resetPasswordsController.create);

export default passwordRouter;
