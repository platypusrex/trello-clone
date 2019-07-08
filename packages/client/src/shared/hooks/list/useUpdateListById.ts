import { MutationFn, useMutation } from 'react-apollo-hooks';
import { UpdateListByIdMutation, UpdateListByIdMutationVariables } from '../../types/generated';
import { updateListByIdMutation } from '../../utils/graphqlFileLoader';

type UseUpdateListById = () => {
  updateList: MutationFn<UpdateListByIdMutation, UpdateListByIdMutationVariables>
};

export const useUpdateListById: UseUpdateListById = () => {
  const updateList =
    useMutation<UpdateListByIdMutation, UpdateListByIdMutationVariables>(updateListByIdMutation);

  return { updateList };
};