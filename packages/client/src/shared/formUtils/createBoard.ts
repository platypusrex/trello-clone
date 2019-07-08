import { CreateBoardInput, CreateBoardMutation, CreateBoardMutationVariables } from '../types/generated';
import { FormikActions, FormikConfig } from 'formik';
import { MutationFn } from 'react-apollo-hooks';
import * as Yup from 'yup';

const initialValues: CreateBoardInput = {
  title: '',
  description: '',
};

const title = Yup.string().required();
const description = Yup.string();
const validationSchema = Yup.object().shape({
  title,
  description,
});

export function createBoardFormikConfig (
  createBoardMutation: MutationFn<CreateBoardMutation, CreateBoardMutationVariables>,
  teamId?: number,
  callback?: () => void,
): FormikConfig<CreateBoardInput> {
  return {
    initialValues,
    validationSchema,
    onSubmit: async (values: CreateBoardInput, actions: FormikActions<CreateBoardInput>) => {
      try {
        await createBoardMutation({
          variables: {
            input: { ...values, teamId }
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
