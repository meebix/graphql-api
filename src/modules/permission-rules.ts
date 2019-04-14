import { rule } from 'graphql-shield';
import authenticate from '@middleware/authenticate';

export const isAuthenticated = rule()(async (parent, args, context, info) => {
  return authenticate(context);
});
