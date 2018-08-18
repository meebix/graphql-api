import { generate, validate } from './token-controller';

const router = {
  root: '/token',
  actions: [
    {
      route: '/',
      method: 'post',
      action: generate,
      middleware: [],
    },
    {
      route: '/:token',
      method: 'patch',
      action: validate,
      middleware: [],
    },
  ],
};

export default router;
