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
        if (!data || !data.createList) {
          return;
        }

        try {
          const { createList } = data;
          const options = { query: listsByBoardIdQuery, variables: { boardId } };
          const listData = store.readQuery<ListsByBoardIdQuery>(options);

          if (!listData || !listData.allListsByBoardId) {
            return;
          }

          store.writeQuery<ListsByBoardIdQuery>({
            ...options,
            data: { allListsByBoardId: [ ...listData.allListsByBoardId, createList ] }
          });
        } catch (e) {
          console.log('useCreateList cache update error', e);
        }
      },
    });

  return { createList };
};