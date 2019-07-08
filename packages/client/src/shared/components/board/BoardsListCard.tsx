import React from 'react';
import { Card } from 'antd';
import { BoardsList, BoardsListProps } from './BoardsList';


export interface BoardsListCardProps extends BoardsListProps {
  title: React.ReactNode;
  loading: boolean;
  style?: React.CSSProperties;
}

export const BoardsListCard: React.FC<BoardsListCardProps> = ({
  loading,
  title,
  boards,
  teamId,
  colProps,
  style
}) => (
  <Card
    loading={loading}
    title={title}
    style={{ marginBottom: 16, ...style }}
  >
    <BoardsList boards={boards} teamId={teamId} colProps={colProps}/>
  </Card>
);