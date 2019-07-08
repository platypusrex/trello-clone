import { UpdateTeamInput, UpdateTeamByIdMutation, UpdateTeamByIdMutationVariables } from '../types/generated';
import { FormikActions, FormikConfig } from 'formik';
import { MutationFn } from 'react-apollo-hooks';
import { Omit } from '../types/shared';
import * as Yup from 'yup';

type UpdateTeamFormValues = Omit<UpdateTeamInput, 'id'>;

const updateTeamByIdFormValues: UpdateTeamFormValues = {
  name: '',
  description: '',
};

const name = Yup.string();
const description = Yup.string();
const validationSchema = Yup.object().shape({
  name,
  description,
});

export function updateTeamFormikConfig (
  updateTeamMutation: MutationFn<UpdateTeamByIdMutation, UpdateTeamByIdMutationVariables>,
  teamId: number,
  initialValues: UpdateTeamFormValues,
  callback?: () => void,
): FormikConfig<UpdateTeamFormValues> {
  return {
    initialValues: { ...updateTeamByIdFormValues, ...initialValues },
    validationSchema,
    onSubmit: async (values: UpdateTeamFormValues, actions: FormikActions<UpdateTeamFormValues>) => {
      try {
        await updateTeamMutation({
          variables: {
            input: { ...values, id: teamId }
          }
        });

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
