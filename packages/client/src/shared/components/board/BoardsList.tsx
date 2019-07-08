import React from 'react';
import { Row, Col } from 'antd';
import { Board } from '../../types/generated';
import { AddBoardButton } from '../../../routes/Dashboard/AddBoardButton';
import { BoardCard } from './BoardCard';
import { ColProps } from 'antd/lib/grid';

const colDefaults = {
  xs: 24,
  sm: 12,
  lg: 8,
  xxl: 6,
  style: { marginBottom: 16 }
};

export interface BoardsListProps {
  boards?: Board[];
  teamId?: number;
  colProps?: ColProps;
}

export const BoardsList: React.FC<BoardsListProps> = ({ boards, teamId, colProps }) => (
  <Row gutter={16} type="flex">
    {boards && boards.length > 0 && boards.map(board => (
      <Col {...colDefaults} {...colProps} key={board.id}>
        <BoardCard board={board} teamId={teamId}/>
      </Col>
    ))}

    <Col {...colDefaults} {...colProps}>
      <AddBoardButton teamId={teamId}/>
    </Col>
  </Row>
);