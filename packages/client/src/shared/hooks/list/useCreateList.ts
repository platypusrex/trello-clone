import { MutationFn, useMutation } from 'react-apollo-hooks';
import { CreateListMutation, CreateListMutationVariables, ListsByBoardIdQuery } from '../../types/generated';
import { createListMutation, listsByBoardIdQuery } from '../../utils/graphqlFileLoader';

type UseCreateListProps = (boardId: number) => {
  createList: MutationFn<CreateListMutation, CreateListMutationVariables>
};

export const useCreateList: UseCreateListProps = (boardId) => {
  const createList =
    useMutation<
      CreateListMutation,
      CreateListMutationVariables
    >(createListMutation, {
      update: (store, { data }) => {
        if (!data) {
          return;
        }

        const { createList } = data;
        const listData = store.readQuery<ListsByBoardIdQuery>({
          query: listsByBoardIdQuery,
          variables: { boardId }
        });

        if (!listData || !listData.allListsByBoardId) {
          return;
        }

        store.writeQuery<ListsByBoardIdQuery>({
          query: listsByBoardIdQuery,
          variables: { boardId },
          data: {
            allListsByBoardId: [ ...listData.allListsByBoardId, createList ]
          }
        });
      },
    });

  return { createList };
};