import React from 'react';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { HorizontalScroll } from '../../shared/components/HorizontalScroll';
import { Column } from './Column';
import { useUpdateListById } from '../../shared/hooks/list/useUpdateListById';
import { useDragAndDrop } from '../../shared/hooks/useDragAndDrop';
import { ListDetail } from '../../shared/types/generated';

interface ParentProps {
  lists: ListDetail[];
  boardId: number;
}

export const BoardListDnD: React.FC<ParentProps> = ({ lists, boardId }) => {
  const { updateList } = useUpdateListById();
  const { columns, onDragEnd } = useDragAndDrop(lists, updateList);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        ignoreContainerClipping={true}
      >
        {(provided: DroppableProvided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <HorizontalScroll
              dataSource={[...columns, {}]}
              renderItem={(list: ListDetail, i) => (
                <Column
                  list={list}
                  boardId={boardId}
                  index={i}
                  columnsLength={columns.length}
                />
              )}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
};