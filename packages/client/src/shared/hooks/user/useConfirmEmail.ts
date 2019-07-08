import { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { loader } from 'graphql.macro';
import { GraphQLError } from 'graphql';
import { ConfirmEmailMutation, ConfirmEmailMutationVariables } from '../../types/generated';
import { Routes } from '../../constants/routes';
import * as H from 'history';

const confirmEmailMutation = loader('../../graphql/user/ConfirmEmailMutation.graphql');

interface ConfirmEmailResult {
  loading: boolean;
  errors?: ReadonlyArray<GraphQLError>;
}
const initialState: ConfirmEmailResult = {
  loading: false,
};

export function useConfirmEmail (token: string, history: H.History) {
  const [ state, setState ] = useState<ConfirmEmailResult>(initialState);
  const mutate = useMutation<ConfirmEmailMutation, ConfirmEmailMutationVariables>(confirmEmailMutation);

  const confirmEmail = async () => {
    setState(prevState => ({ ...prevState, loading: true }));

    try {
      const { errors } = await mutate({
        variables: { token }
      });

      setState(prevState => ({
        ...prevState,
        errors,
        loading: false
      }));

      history.push(Routes.DASHBOARD);
    } catch (errors) {
      setState(prevState => ({
        ...prevState,
        errors,
        loading: false
      }))
    }
  };

  return { confirmEmail, ...state };
}