import config from 'config';
import { shield, deny } from 'graphql-shield';
import merge from 'lodash.merge';
import ApiError from '@modules/errors';

import { permissions as userPermissions } from '@models/user';

const permissions = shield(merge(userPermissions), {
  debug: config.get('graphql.debug'),
  fallbackRule: deny,
  fallbackError: ApiError('UNAUTHORIZED'),
});

export default permissions;
