import { useMutation } from 'react-apollo-hooks';
import {
  DeleteListByIdMutation,
  DeleteListByIdMutationVariables,
  ListsByBoardIdQuery,
  ListsByBoardIdQueryVariables
} from '../../types/generated';
import {
  deleteListByIdMutation,
  listsByBoardIdQuery
} from '../../utils/graphqlFileLoader';
import { FetchResult } from 'apollo-link';

type UseDeleteListById = () => {
  deleteList: (listId: number, boardId: number) => Promise<FetchResult<DeleteListByIdMutation>>;
};

export const useDeleteListById: UseDeleteListById = () => {
  const mutate = useMutation<DeleteListByIdMutation, DeleteListByIdMutationVariables>(deleteListByIdMutation);

  const deleteList = async (listId: number, boardId: number) => mutate({
    variables: { listId },
    update: (store, { data }) => {
      if (!data || !data.deleteListById) {
        return;
      }

      try {
        const options = { query: listsByBoardIdQuery, variables: { boardId } };
        const listsData = store.readQuery<ListsByBoardIdQuery, ListsByBoardIdQueryVariables>(options);

        if (!listsData || !listsData.allListsByBoardId) {
          return;
        }

        // for whatever reason writeQuery is not updating the cache here but directly updating listsData is??
        store.writeQuery<ListsByBoardIdQuery, ListsByBoardIdQueryVariables>({
          ...options,
          data: {
            allListsByBoardId: listsData.allListsByBoardId.filter(list => list.id !== listId),
          }
        });
      } catch (e) {
        console.log('deleteList cache update error:', e);
      }
    }
  });

  return { deleteList };
};