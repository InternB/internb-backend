import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

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
  celebrate({
    [Segments.BODY]: {
      avatar: Joi.string().uuid().required(),
    },
  }),
  userAvatarsController.update,
);

export default profilesRouter;
