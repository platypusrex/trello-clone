import { LoginInput, LoginMutation, LoginMutationVariables } from '../types/generated';
import * as Yup from 'yup';
import { email, password } from './shared';
import { FormikActions, FormikConfig } from 'formik';
import { MutationFn } from 'react-apollo-hooks';
import * as H from 'history';
import { Routes } from '../constants/routes';
import { apolloClient } from '../../apolloClient';

const initialValues: LoginInput = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email,
  password,
});

export function loginFormikConfig (
  loginMutation: MutationFn<LoginMutation, LoginMutationVariables>,
  history: H.History
): FormikConfig<LoginInput> {
  return {
    initialValues,
    validationSchema,
    onSubmit: async (values: LoginInput, actions: FormikActions<LoginInput>) => {
      try {
        const { data } = await loginMutation({ variables: { input: values } });
        await apolloClient.resetStore();
        const user = data && data.login;

        if (!user) {
          actions.setStatus({ formError: 'Sorry, your username and/or password are incorrect' });
        } else {
          history.push(Routes.DASHBOARD)
        }
      } catch (e) {
        actions.setStatus({ formError: 'Sorry, your username and/or password are incorrect' });
      }

      actions.setSubmitting(false);
    },
  }
}
