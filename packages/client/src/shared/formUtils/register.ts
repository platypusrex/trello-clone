import { RegisterInput, RegisterMutation, RegisterMutationVariables } from '../types/generated';
import { email, password } from './shared';
import { FormikActions, FormikConfig } from 'formik';
import { MutationFn } from 'react-apollo-hooks';
// import { Routes } from '../constants/routes';
import * as H from 'history';
import * as Yup from 'yup';

const initialValues: RegisterInput = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const firstName = Yup.string().required();
const lastName = Yup.string().required();

const validationSchema = Yup.object().shape({
  firstName,
  lastName,
  email,
  password,
});

export function registerFormikConfig (
  registerMutation: MutationFn<RegisterMutation, RegisterMutationVariables>,
  history: H.History
): FormikConfig<RegisterInput> {
  return {
    initialValues,
    validationSchema,
    onSubmit: async (values: RegisterInput, actions: FormikActions<RegisterInput>) => {
      try {
        const { data } = await registerMutation({ variables: { input: values } });
        const user = data && data.register;

        if (!user) {
          actions.setStatus({ formError: 'Sorry, your username and/or password are incorrect' });
        } else {
          actions.setStatus({ user: user })
        }
      } catch (e) {
        actions.setStatus({ formError: 'Sorry, your username and/or password are incorrect' });
      }

      actions.setSubmitting(false);
    },
  }
}
