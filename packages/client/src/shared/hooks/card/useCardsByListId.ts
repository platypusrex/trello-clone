import { queryHookFactory } from '../utils/queryHookFactory';
import { cardsByListIdQuery } from '../../utils/graphqlFileLoader';
import { Omit } from '../../types/shared';
import { QueryHookResult } from 'react-apollo-hooks';
import { Card, CardsByListIdQuery, CardsByListIdQueryVariables } from '../../types/generated';

type CardsByListIdQueryResult = Omit<QueryHookResult<CardsByListIdQuery, CardsByListIdQueryVariables>, 'data'>;
type UseCardsByListId = (listId: number) => CardsByListIdQueryResult & {
  cards?: Card[];
}

export const useCardsByListId: UseCardsByListId = (listId: number) =>
  queryHookFactory<CardsByListIdQuery, CardsByListIdQueryVariables>(cardsByListIdQuery, {
    variables: { listId },
    transformData: {
      name: 'allCardsByListId',
      propName: 'cards'
    }
  })();