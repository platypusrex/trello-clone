import { Omit } from '../../types/shared';
import { QueryHookResult } from 'react-apollo-hooks';
import { Board, BoardsByUserIdQuery } from '../../types/generated';
import { queryHookFactory } from '../utils/queryHookFactory';
import { boardsByUserIdQuery } from '../../utils/graphqlFileLoader';

type BoardsByUserIdQueryResult = Omit<QueryHookResult<BoardsByUserIdQuery, {}>, 'data'>;
type UseBoardsByUserId = () => BoardsByUserIdQueryResult & {
  boards?: Board[];
};

export const useBoardsByUserId: UseBoardsByUserId =
  queryHookFactory<BoardsByUserIdQuery, {}>(boardsByUserIdQuery, {
    transformData: {
      name: 'allBoardsByUserId',
      propName: 'boards'
    }
  });