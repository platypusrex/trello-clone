import { MutationFn, useMutation } from 'react-apollo-hooks';
import {
  CreateCardMutation,
  CreateCardMutationVariables,
  CardsByListIdQuery,
  CardsByListIdQueryVariables
} from '../../types/generated';
import { createCardMutation, cardsByListIdQuery } from '../../utils/graphqlFileLoader';

type UseCreateCardProps = (listId: number) => {
  createCard: MutationFn<CreateCardMutation, CreateCardMutationVariables>
};

export const useCreateCard: UseCreateCardProps = (listId) => {
  const createCard =
    useMutation<
      CreateCardMutation,
      CreateCardMutationVariables
    >(createCardMutation, {
      update: (store, { data }) => {
        if (!data) {
          return;
        }

        const { createCard } = data;
        const cardData = store.readQuery<CardsByListIdQuery, CardsByListIdQueryVariables>({
          query: cardsByListIdQuery,
          variables: { listId }
        });

        if (!cardData || !cardData.allCardsByListId) {
          return;
        }

        store.writeQuery<CardsByListIdQuery, CardsByListIdQueryVariables>({
          query: cardsByListIdQuery,
          variables: { listId },
          data: {
            allCardsByListId: [ ...cardData.allCardsByListId, createCard ]
          }
        });
      },
    });

  return { createCard };
};