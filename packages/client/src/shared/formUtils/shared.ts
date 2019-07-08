import * as Yup from 'yup';

export const email = Yup.string()
  .email()
  .required();

export const password = Yup.string()
  .min(6)
  .max(50)
  .required();