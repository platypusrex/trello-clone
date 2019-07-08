import { MutationFn, useMutation } from 'react-apollo-hooks';
import { CreateBoardMutation, CreateBoardMutationVariables } from '../../types/generated';
import {
  createBoardMutation,
  personalBoardsByUserIdQuery,
  teamBoardsByUserIdQuery
} from '../../utils/graphqlFileLoader';

type UseCreateBoard = (teamId?: number) => {
  createBoard: MutationFn<CreateBoardMutation, CreateBoardMutationVariables>
};

export const useCreateBoard: UseCreateBoard = (teamId) => {
  const createBoard =
    useMutation<
      CreateBoardMutation,
      CreateBoardMutationVariables
    >(createBoardMutation, {
      refetchQueries: () => {
        const query = teamId ? teamBoardsByUserIdQuery : personalBoardsByUserIdQuery;
        return [{ query }];
      }
    });

  return { createBoard };
};