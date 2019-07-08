import { Omit } from '../../types/shared';
import { QueryHookResult } from 'react-apollo-hooks';
import { Team, TeamsByUserIdQuery } from '../../types/generated';
import { queryHookFactory } from '../utils/queryHookFactory';
import { teamsByUserIdQuery } from '../../utils/graphqlFileLoader';

type TeamsByUserIdQueryResult = Omit<QueryHookResult<TeamsByUserIdQuery, {}>, 'data'>;
type UseTeamsByUserId = () => TeamsByUserIdQueryResult & {
  teams?: Team[];
}

export const useTeamsByUserId: UseTeamsByUserId =
  queryHookFactory<TeamsByUserIdQuery, {}>(teamsByUserIdQuery, {
    transformData: {
      name: 'allTeamsByUserId',
      propName: 'teams',
    }
  });