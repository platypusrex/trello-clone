import React from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { BoardList } from './BoardList';
import { AddList } from './AddList';
import { ListDetail } from '../../shared/types/generated';

interface ParentProps {
  list: ListDetail;
  boardId: number;
  index: number;
  columnsLength: number;
}

export const ColumnComponent: React.FC<ParentProps> = ({ list, boardId, index, columnsLength }) => {
  const draggableId = `${list.title}__${index}`;
  const content = !!list.id
    ? <BoardList list={list} boardId={boardId} columnsLength={columnsLength}/>
    : <AddList boardId={boardId}/>;

  return (
    <Draggable
      isDragDisabled={!list.id}
      key={draggableId}
      draggableId={draggableId}
      index={index}>
      {(provided: DraggableProvided) => (
        <div>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {content}
          </div>

          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export const Column = React.memo(ColumnComponent);