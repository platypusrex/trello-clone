import { MutationFn, useMutation } from 'react-apollo-hooks';
import { loader } from 'graphql.macro';
import { LoginMutation, LoginMutationVariables } from '../../types/generated';

const loginQuery = loader('../../graphql/user/loginMutation.graphql');

type UseLoginProps = () => {
  login: MutationFn<LoginMutation, LoginMutationVariables>;
};

export const useLogin: UseLoginProps = () => {
  const login = useMutation<LoginMutation, LoginMutationVariables>(loginQuery);

  return { login };
};