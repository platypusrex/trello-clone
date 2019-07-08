import React from 'react';
import { Button, Card, Icon, Popconfirm } from 'antd';
import { generatePath, Link, LinkProps } from 'react-router-dom';
import { CardProps } from 'antd/lib/card';
import { ButtonProps } from 'antd/lib/button';
import { Board } from '../../types/generated';
import { useDeleteBoardById } from '../../hooks/board/useDeleteBoardById';
import { Routes } from '../../constants/routes';
import styled from '../../styled';

const BoardCardWrapper = styled(Card)<CardProps>`
  height: 140px;
  position: relative;
  
  .ant-card-body {
    height: 100%;
  }
`;

const CardLink = styled(Link)<LinkProps>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
`;

const DeleteButton = styled((props) => <Button {...props}/>)<ButtonProps>`
  border: none;
  padding: 0;
  position: absolute;
  top: 8px;
  right: 12px;
  z-index: 10;
`;

interface ParentProps {
  board: Board;
  teamId?: number;
}

export const BoardCard: React.FC<ParentProps> = ({ board, teamId }) => {
  const { deleteBoard, loading } = useDeleteBoardById(board.id, teamId);

  const handleDeleteBoard = async () => {
    try {
      await deleteBoard();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <BoardCardWrapper hoverable={true}>
      <Popconfirm
        title={`Delete ${board.title}?`}
        placement="topRight"
        onConfirm={handleDeleteBoard}
        okButtonProps={{ loading }}
      >
        <DeleteButton size="small" type="danger" ghost={true}>
          <Icon type="close"/>
        </DeleteButton>
      </Popconfirm>

      <CardLink to={generatePath(Routes.BOARD_DETAIL, { boardId: board.id })}/>

      <Card.Meta
        title={board.title}
        description={board.description}
      />
    </BoardCardWrapper>
  );
};