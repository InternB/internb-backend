import { Router } from 'express';

import ForgotPasswordsController from '../controllers/ForgotPasswordsController';

const passwordRouter = Router();
const forgotPasswordsController = new ForgotPasswordsController();

passwordRouter.post('/forgot', forgotPasswordsController.create);
// passwordRouter.post('/reset', () => {});

export default passwordRouter;
