import { FormikActions, FormikConfig } from 'formik';
import { MutationFn } from 'react-apollo-hooks';
import { OperationVariables } from 'apollo-boost';

interface FormikUtilOptions {
  validationSchema: any | (() => any),
  callback?: () => void;
}

export function formikConfigUtil <FormikValues, TData, TVariables = OperationVariables>(
  mutation: MutationFn<TData, TVariables>,
  options: FormikUtilOptions & {
    initialValues: FormikValues,
    variables: TVariables
  }
): FormikConfig<FormikValues> {
  return {
    initialValues: options.initialValues,
    validationSchema: options.validationSchema,
    onSubmit: async (values: FormikValues, actions: FormikActions<FormikValues>) => {
      try {
        await mutation({ variables: options.variables });

        if (options.callback) {
          options.callback();
        }
      } catch (e) {
        actions.setStatus({ formError: e.message });
      }

      actions.setSubmitting(false);
    },
  }
}
