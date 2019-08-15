import { MutationFn, useMutation } from 'react-apollo-hooks';
import {
  CreateCardMutation,
  CreateCardMutationVariables,
  ListsByBoardIdQuery,
  ListsByBoardIdQueryVariables
} from '../../types/generated';
import { createCardMutation, listsByBoardIdQuery } from '../../utils/graphqlFileLoader';

type UseCreateCardProps = (listId: number, boardId: number) => {
  createCard: MutationFn<CreateCardMutation, CreateCardMutationVariables>
};

export const useCreateCard: UseCreateCardProps = (listId, boardId) => {
  const createCard =
    useMutation<
      CreateCardMutation,
      CreateCardMutationVariables
    >(createCardMutation, {
      update: (store, { data }) => {
        if (!data || !data.createCard) {
          return;
        }

        try {
          const { createCard } = data;
          const options = { query: listsByBoardIdQuery, variables: { boardId } };
          const listData = store.readQuery<ListsByBoardIdQuery, ListsByBoardIdQueryVariables>(options);

          if (!listData || !listData.allListsByBoardId) {
            return;
          }

          const lists = listData.allListsByBoardId.map(list => {
            if (list.id === listId) {
              return {
                ...list,
                cards: [ ...list.cards || [], createCard ]
              };
            }
            return list;
          });

          store.writeQuery<ListsByBoardIdQuery, ListsByBoardIdQueryVariables>({
            ...options,
            data: {
              allListsByBoardId: lists
            }
          });
        } catch (e) {
          console.log('useCreateCard cache update error', e);
        }
      },
    });

  return { createCard };
};
