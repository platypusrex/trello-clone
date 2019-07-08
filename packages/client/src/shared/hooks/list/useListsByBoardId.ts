import { queryHookFactory } from '../utils/queryHookFactory';
import { listsByBoardIdQuery } from '../../utils/graphqlFileLoader';
import { Omit } from '../../types/shared';
import { QueryHookResult } from 'react-apollo-hooks';
import { ListsByBoardIdQuery, ListsByBoardIdQueryVariables, ListDetail } from '../../types/generated';

type ListsByBoardIdQueryResult = Omit<QueryHookResult<ListsByBoardIdQuery, ListsByBoardIdQueryVariables>, 'data'>;
type UseListsByBoardId = (boardId: number) => ListsByBoardIdQueryResult & {
  lists?: ListDetail[];
}

export const useListsByBoardId: UseListsByBoardId = (boardId: number) =>
  queryHookFactory<ListsByBoardIdQuery, ListsByBoardIdQueryVariables>(listsByBoardIdQuery, {
    variables: { boardId },
    transformData: {
      name: 'allListsByBoardId',
      propName: 'lists'
    }
  })();