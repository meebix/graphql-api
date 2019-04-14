import { inputRule } from 'graphql-shield';
import { alpha, email } from '@modules/validation-rules';

const validations = {
  Query: {
    getUser: inputRule(yup => yup.object({ email })),
  },
  Mutation: {
    registerUser: inputRule(yup =>
      yup.object({ firstName: alpha, lastName: alpha, email })
    ),
    loginUser: inputRule(yup => yup.object({ email })),
  },
};

export default validations;
