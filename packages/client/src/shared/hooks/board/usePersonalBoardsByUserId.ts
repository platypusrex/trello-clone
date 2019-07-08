import { Omit } from '../../types/shared';
import { QueryHookResult } from 'react-apollo-hooks';
import { Board, PersonalBoardsByUserIdQuery } from '../../types/generated';
import { queryHookFactory } from '../utils/queryHookFactory';
import { personalBoardsByUserIdQuery } from '../../utils/graphqlFileLoader';

type PersonalBoardsByUserIdQueryResult = Omit<QueryHookResult<PersonalBoardsByUserIdQuery, {}>, 'data'>;
type UsePersonalBoardsByUserId = () => PersonalBoardsByUserIdQueryResult & {
  boards?: Board[];
};

export const usePersonalBoardsBuUserId: UsePersonalBoardsByUserId =
  queryHookFactory<PersonalBoardsByUserIdQuery, {}>(personalBoardsByUserIdQuery, {
    transformData: {
      name: 'allPersonalBoardsByUserId',
      propName: 'boards'
    }
  });