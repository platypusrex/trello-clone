import { Omit } from '../../types/shared';
import { QueryHookResult } from 'react-apollo-hooks';
import { TeamBoard, TeamBoardsByUserIdQuery } from '../../types/generated';
import { queryHookFactory } from '../utils/queryHookFactory';
import { teamBoardsByUserIdQuery } from '../../utils/graphqlFileLoader';

type TeamBoardsByUserIdQueryResult = Omit<QueryHookResult<TeamBoardsByUserIdQuery, {}>, 'data'>;
type UseTeamBoardsByUserId = () => TeamBoardsByUserIdQueryResult & {
  teamBoards?: TeamBoard[];
}

export const useTeamBoardsByUserId: UseTeamBoardsByUserId =
  queryHookFactory<TeamBoardsByUserIdQuery, {}>(teamBoardsByUserIdQuery, {
    transformData: {
      name: 'allTeamsByUserId',
      propName: 'teamBoards',
    }
  });