import { QueryHookResult } from 'react-apollo-hooks';
import { teamDetailByIdQuery } from '../../utils/graphqlFileLoader';
import { TeamDetail, TeamDetailByIdQuery, TeamDetailByIdQueryVariables } from '../../types/generated';
import { queryHookFactory } from '../utils/queryHookFactory';
import { Omit } from '../../types/shared';

type TeamDetailByIdQueryResult = Omit<QueryHookResult<TeamDetailByIdQuery, TeamDetailByIdQueryVariables>, 'data'> | undefined;
type UseTeamDetailById = (teamId: number) => TeamDetailByIdQueryResult & {
  teamDetail?: TeamDetail;
}

export const useTeamsDetailById: UseTeamDetailById = (teamId: number) =>
  queryHookFactory<TeamDetailByIdQuery, TeamDetailByIdQueryVariables>(teamDetailByIdQuery, {
    variables: { teamId },
    transformData: {
      name: 'teamById',
      propName: 'teamDetail',
    },
  })();