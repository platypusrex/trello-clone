import React from 'react';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { HorizontalScroll } from '../../shared/components/HorizontalScroll';
import { Column } from './Column';
import { useUpdateListsById } from '../../shared/hooks/list/useUpdateListsById';
import { useDragAndDrop } from '../../shared/hooks/useDragAndDrop';
import { ListDetail } from '../../shared/types/generated';
import { ADD_BUTTON, COLUMN } from '../../shared/constants/dragAndDrop';
import styled from '../../shared/styled';

const ColumnsWrapper = styled.div`
  /* utility-name */
`;

interface ParentProps {
  lists: ListDetail[];
  boardId: number;
}

export const BoardListDnD: React.FC<ParentProps> = ({ lists, boardId }) => {
  const { updateLists } = useUpdateListsById(boardId);
  const { columns, ordered, onDragEnd } = useDragAndDrop(lists, updateLists);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="board"
        type={COLUMN}
        direction="horizontal"
        ignoreContainerClipping={true}
      >
        {(provided: DroppableProvided) => (
          <ColumnsWrapper
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <HorizontalScroll
              dataSource={[...ordered, ADD_BUTTON]}
              renderItem={(key: string, index: number) => {
                const column = key === ADD_BUTTON ? { title: ADD_BUTTON } : columns[key];

                return (
                  <Column
                    key={key}
                    list={column as ListDetail}
                    boardId={boardId}
                    index={index}
                    columnsLength={ordered.length}
                  />
                )
              }}
            />
            {provided.placeholder}
          </ColumnsWrapper>
        )}
      </Droppable>
    </DragDropContext>
  )
};
