import config from 'config';
import path from 'path';
import { shield, deny } from 'graphql-shield';
import assign from 'assign-deep';
import { fileLoader } from 'merge-graphql-schemas';
import { InternalError } from '@modules/errors';

const permissionsArray = fileLoader(
  path.join(process.cwd(), 'src/models/**/access.ts')
);

/**
 * Create access permissions
 *
 * @function
 * @returns {Function} - A Shield function generator to be used as middleware
 */
export default shield(assign(...permissionsArray), {
  debug: config.get('graphql.debug'),
  fallbackRule: deny,
  fallbackError: new InternalError('UNAUTHORIZED'),
});
