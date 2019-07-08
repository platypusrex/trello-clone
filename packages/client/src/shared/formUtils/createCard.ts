import { CreateCardInput, CreateCardMutation, CreateCardMutationVariables } from '../types/generated';
import { FormikActions, FormikConfig } from 'formik';
import { MutationFn } from 'react-apollo-hooks';
import * as Yup from 'yup';
import { Omit } from '../types/shared';

type CreateCardInitialValues = Omit<CreateCardInput, 'listId'>;
const initialValues: CreateCardInitialValues = {
  title: '',
};

const title = Yup.string().required();
const validationSchema = Yup.object().shape({ title });

export function createCardFormikConfig (
  createCardMutation: MutationFn<CreateCardMutation, CreateCardMutationVariables>,
  listId: number,
  callback?: () => void,
): FormikConfig<CreateCardInitialValues> {
  return {
    initialValues,
    validationSchema,
    onSubmit: async (values: CreateCardInitialValues, actions: FormikActions<CreateCardInitialValues>) => {
      try {
        await createCardMutation({
          variables: {
            input: { ...values, listId }
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
