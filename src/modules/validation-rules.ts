import * as yup from 'yup';

export const email = yup.string().email('Invalid email address');
export const alpha = yup
  .string()
  .matches(/^[a-zA-Z'-.\s]+$/, 'Must contain letters only');
