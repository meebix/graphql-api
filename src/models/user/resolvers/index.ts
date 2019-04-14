import { resolvers as modelResolvers } from './model';
import { resolvers as mainResolvers } from './controller';

export default {
  ...modelResolvers,
  ...mainResolvers,
};
