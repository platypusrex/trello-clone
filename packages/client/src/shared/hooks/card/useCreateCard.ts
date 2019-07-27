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
        if (!data || !data.createCard) {
          return;
        }

        try {
          const { createCard } = data;
          const options = { query: cardsByListIdQuery, variables: { listId } };
          const cardData = store.readQuery<CardsByListIdQuery, CardsByListIdQueryVariables>(options);

          if (!cardData || !cardData.allCardsByListId) {
            return;
          }

          store.writeQuery<CardsByListIdQuery, CardsByListIdQueryVariables>({
            ...options,
            data: { allCardsByListId: [ ...cardData.allCardsByListId, createCard ] }
          });
        } catch (e) {
          console.log('useCreateCard cache update error', e);
        }
      },
    });

  return { createCard };
};