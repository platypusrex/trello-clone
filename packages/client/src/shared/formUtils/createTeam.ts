import { CreateTeamInput, CreateTeamMutation, CreateTeamMutationVariables } from '../types/generated';
import { FormikActions, FormikConfig } from 'formik';
import { MutationFn } from 'react-apollo-hooks';
import * as Yup from 'yup';

const initialValues: CreateTeamInput = {
  name: '',
  description: '',
};

const name = Yup.string().required();
const description = Yup.string();
const validationSchema = Yup.object().shape({
  name,
  description,
});

export function createTeamFormikConfig (
  createTeamMutation: MutationFn<CreateTeamMutation, CreateTeamMutationVariables>,
  callback?: () => void,
): FormikConfig<CreateTeamInput> {
  return {
    initialValues,
    validationSchema,
    onSubmit: async (values: CreateTeamInput, actions: FormikActions<CreateTeamInput>) => {
      try {
        await createTeamMutation({ variables: { input: values } });

        if (callback) {
          callback();
        }
      } catch (e) {
        actions.setStatus({ formError: e.message });
      }

      actions.setSubmitting(false);
    },
  }
}
