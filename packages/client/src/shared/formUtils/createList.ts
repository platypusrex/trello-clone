import { CreateListInput, CreateListMutation, CreateListMutationVariables } from '../types/generated';
import { FormikActions, FormikConfig } from 'formik';
import { MutationFn } from 'react-apollo-hooks';
import * as Yup from 'yup';
import { Omit } from '../types/shared';

type CreateListInitialValues = Omit<CreateListInput, 'boardId'>;
const initialValues: CreateListInitialValues = {
  title: '',
};

const title = Yup.string().required();
const validationSchema = Yup.object().shape({ title });

export function createListFormikConfig (
  createListMutation: MutationFn<CreateListMutation, CreateListMutationVariables>,
  boardId: number,
  callback?: () => void,
): FormikConfig<CreateListInitialValues> {
  return {
    initialValues,
    validationSchema,
    onSubmit: async (values: CreateListInitialValues, actions: FormikActions<CreateListInitialValues>) => {
      try {
        await createListMutation({
          variables: {
            input: { ...values, boardId }
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
