import { UpdateListInput, UpdateListByIdMutation, UpdateListByIdMutationVariables } from '../types/generated';
import { FormikActions, FormikConfig } from 'formik';
import { MutationFn } from 'react-apollo-hooks';
import * as Yup from 'yup';
import { Omit } from '../types/shared';

export type UpdateListInitialValues = Omit<UpdateListInput, 'id'>;

const title = Yup.string();
const position = Yup.number();
export const updateListValidationSchema = Yup.object().shape({ title, position });

export function updateListFormikConfig (
  updateListMutation: MutationFn<UpdateListByIdMutation, UpdateListByIdMutationVariables>,
  listId: number,
  defaultValues?: UpdateListInitialValues,
  callback?: () => void,
): FormikConfig<UpdateListInitialValues> {
  return {
    initialValues: { ...defaultValues },
    validationSchema: updateListValidationSchema,
    onSubmit: async (values: UpdateListInitialValues, actions: FormikActions<UpdateListInitialValues>) => {
      try {
        await updateListMutation({
          variables: {
            input: { ...values, id: listId }
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
