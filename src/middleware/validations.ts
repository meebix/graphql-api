import { shield } from 'graphql-shield';
import merge from 'lodash.merge';

import { validations as userValidations } from '@models/user';

const validations = shield(merge(userValidations));

export default validations;
