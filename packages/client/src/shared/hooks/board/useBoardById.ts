import { queryHookFactory } from '../utils/queryHookFactory';
import { boardByIdQuery } from '../../utils/graphqlFileLoader';
import { Omit } from '../../types/shared';
import { QueryHookResult } from 'react-apollo-hooks';
import { BoardByIdQuery, BoardByIdQueryVariables, BoardDetail } from '../../types/generated';

type BoardByIdQueryResult = Omit<QueryHookResult<BoardByIdQuery, BoardByIdQueryVariables>, 'data'>;
type UseBoardById = (boardId: number) => BoardByIdQueryResult & {
  boardDetail?: BoardDetail;
}

export const useBoardById: UseBoardById = (boardId: number) =>
  queryHookFactory<BoardByIdQuery, BoardByIdQueryVariables>(boardByIdQuery, {
    variables: { boardId },
    transformData: {
      name: 'boardById',
      propName: 'boardDetail'
    }
  })();