import React from 'react';
import { BoardsListCard } from '../../shared/components/board/BoardsListCard';
import { useTeamBoardsByUserId } from '../../shared/hooks/team/useTeamBoardsByUserId';
import { IconTitle } from '../../shared/components/IconTitle';

export const TeamBoardsList: React.FC<{}> = () => {
  const { teamBoards = [], loading } = useTeamBoardsByUserId();

  return (
    <React.Fragment>
      {teamBoards.map(teamBoards => (
        <BoardsListCard
          key={teamBoards.id}
          loading={loading}
          title={<IconTitle iconType="team" title={teamBoards.name}/>}
          boards={teamBoards.boards}
          teamId={teamBoards.id}
        />
      ))}
    </React.Fragment>
  );
};