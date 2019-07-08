import React from 'react';
import { BoardListDnD } from './BoardListDnD';
import { useListsByBoardId } from '../../shared/hooks/list/useListsByBoardId';

interface ParentProps {
  boardId: number;
}

export const BoardLists: React.FC<ParentProps> = ({ boardId }) => {
  const { lists } = useListsByBoardId(boardId);

  if (!lists) {
    return null;
  }

  return <BoardListDnD lists={lists} boardId={boardId}/>;
};