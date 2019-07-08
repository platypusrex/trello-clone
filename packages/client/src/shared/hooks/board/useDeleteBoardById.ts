import { useMutation } from 'react-apollo-hooks';
import {
  DeleteBoardByIdMutation,
  DeleteBoardByIdMutationVariables
} from '../../types/generated';
import {
  deleteBoardByIdMutation,
  personalBoardsByUserIdQuery,
  teamBoardsByUserIdQuery,
} from '../../utils/graphqlFileLoader';
import { useAsyncOpState, AsyncOpState } from '../useAsyncOpState';

type UseDeleteBoardById = (id: number, teamId?: number) => AsyncOpState & {
  deleteBoard: () => Promise<void>;
};

export const useDeleteBoardById: UseDeleteBoardById = (id, teamId) => {
  const { state, setState } = useAsyncOpState();
  const mutate = useMutation<DeleteBoardByIdMutation, DeleteBoardByIdMutationVariables>(deleteBoardByIdMutation);

  const deleteBoard = async () => {
    setState(ss => ({ ...ss, loading: true }));

    try {
      const { errors } = await mutate({
        variables: { id },
        refetchQueries: () => {
          const query = teamId ? teamBoardsByUserIdQuery : personalBoardsByUserIdQuery;
          return [{ query }];
        }
      });

      setState(prevState => ({
        ...prevState,
        errors,
        loading: false
      }))
    } catch (errors) {
      setState(prevState => ({
        ...prevState,
        errors,
        loading: false
      }))
    }
  };

  return { deleteBoard, ...state };
};