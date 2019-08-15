import { MutationFn, useMutation } from 'react-apollo-hooks';
import {
  ListsByBoardIdQuery,
  ListsByBoardIdQueryVariables,
  UpdateListsByIdMutation,
  UpdateListsByIdMutationVariables
} from '../../types/generated';
import { listsByBoardIdQuery, updateListsByIdMutation } from '../../utils/graphqlFileLoader';

type UseUpdateListsById = (boardId: number) => {
  updateLists: MutationFn<UpdateListsByIdMutation, UpdateListsByIdMutationVariables>
};

export const useUpdateListsById: UseUpdateListsById = (boardId) => {
  const updateLists = useMutation<
    UpdateListsByIdMutation,
    UpdateListsByIdMutationVariables
  >(updateListsByIdMutation, {
    update: (store, { data }) => {
      if (!data || !data.updateListsById) {
        return;
      }

      try {
        const options = { query: listsByBoardIdQuery, variables: { boardId } };
        const listsData = store.readQuery<ListsByBoardIdQuery, ListsByBoardIdQueryVariables>(options);

        if (!listsData || !listsData.allListsByBoardId) {
          return;
        }

        const newData = listsData.allListsByBoardId.map(list => {
          const updatedList = data.updateListsById.find(l => l.id === list.id);
          return updatedList ? updatedList : list;
        }).sort((listA, listB) => listA.position - listB.position);

        store.writeQuery<ListsByBoardIdQuery, ListsByBoardIdQueryVariables>({
          ...options,
          data: {
            allListsByBoardId: newData,
          }
        });
      } catch (e) {
        console.log('deleteList cache update error:', e);
      }
    }
  });

  return { updateLists };
};
