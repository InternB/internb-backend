import { Router } from 'express';

import userAvatar from '@config/uploadsConfig/UserAvatarUpload';

import ProfilesController from '../controllers/ProfilesController';
import UserAvatarsController from '../controllers/UserAvatarsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profilesRouter = Router();
const profilesController = new ProfilesController();
const userAvatarsController = new UserAvatarsController();

profilesRouter.use(ensureAuthenticated);

profilesRouter.get('/', profilesController.show);

profilesRouter.put('/', profilesController.update);

profilesRouter.patch(
  '/',
  userAvatar.upload.single('avatar'),
  userAvatarsController.update,
);

export default profilesRouter;
