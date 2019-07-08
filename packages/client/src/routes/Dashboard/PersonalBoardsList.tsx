import React from 'react';
import { BoardsListCard } from '../../shared/components/board/BoardsListCard';
import { IconTitle } from '../../shared/components/IconTitle';
import { usePersonalBoardsBuUserId } from '../../shared/hooks/board/usePersonalBoardsByUserId';

export const PersonalBoardsList: React.FC<{}> = () => {
  const { boards, loading } = usePersonalBoardsBuUserId();

  return (
    <BoardsListCard
      loading={loading}
      title={<IconTitle iconType="user" title="Personal Boards"/>}
      boards={boards}
    />
  );
};