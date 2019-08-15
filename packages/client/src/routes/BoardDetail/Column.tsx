import React from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { BoardList } from './BoardList';
import { AddList } from './AddList';
import { ListDetail } from '../../shared/types/generated';
import styled from '../../shared/styled';

const ColumnWrapper = styled.div`
  /* utility-name */
`;

const ColumnInnerWrapper = styled.div`
  /* utility-name */
`;

interface ParentProps {
  list: ListDetail;
  boardId: number;
  index: number;
  columnsLength: number;
}

export const ColumnComponent: React.FC<ParentProps> = ({ list, boardId, index, columnsLength }) => {
  const content = !!list.id ? (
    <BoardList
      list={list}
      boardId={boardId}
      columnsLength={columnsLength}
    />
  ) :
  <AddList boardId={boardId}/>;

  return (
    <Draggable
      isDragDisabled={!list.id}
      key={list.title}
      draggableId={list.title}
      index={index}
    >
      {(provided: DraggableProvided) => (
        <ColumnWrapper>
          <ColumnInnerWrapper
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {content}
          </ColumnInnerWrapper>

          {provided.placeholder}
        </ColumnWrapper>
      )}
    </Draggable>
  );
};

export const Column = React.memo(ColumnComponent);
