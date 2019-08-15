import React, { useState } from 'react';
import { Card } from 'antd';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { CardProps } from 'antd/lib/card';
import { ListDetail } from '../../shared/types/generated';
import { CardList } from './CardList';
import { BoardListDropdown } from './BoardListDropdown';
import { AddCard } from './AddCard';
import { Flex } from '../../shared/components/Flex';
import { LIST } from '../../shared/constants/dragAndDrop';
import styled from '../../shared/styled';

const BoardListWrapper = styled(Card)<CardProps>`
  width: 300px;
  margin-right: 16px;
  height: fit-content;
  
  .ant-card-body {
    position: relative;
    padding: 0;
  }
  
  .ant-card-head {
    min-height: auto;
    padding-right: 5px;
  }
  
  .ant-card-head-title {
    padding: 10px 0;
    font-size: 14px;
  }
  
  .ant-card-extra {
    padding: 0;
  }
`;

const BoardListInnerWrapper = styled('div')<{ isFormVisible: boolean; }>`
  min-height: ${({ isFormVisible }) => isFormVisible ? 'auto' : '25px'};
`;

const BoardListDropZone = styled.div`
  height: 100%;
`;

interface ParentProps {
  list: ListDetail;
  boardId: number;
  columnsLength: number;
}

export const BoardList: React.FC<ParentProps> = ({ list, boardId, columnsLength }) => {
  const [ isFormVisible, setFormVisible ] = useState(false);
  const extra = (
    <BoardListDropdown
      list={list}
      boardId={boardId}
      columnsLength={columnsLength}
    />
  );

  return (
    <Flex>
      <BoardListWrapper
        title={list.title}
        extra={extra}
      >
        <Droppable
          droppableId={list.title}
          type={LIST}
          ignoreContainerClipping={true}
        >
          {(provided: DroppableProvided) => (
            <BoardListInnerWrapper isFormVisible={isFormVisible}>
              <BoardListDropZone
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <CardList cards={list.cards}/>
              </BoardListDropZone>

              {provided.placeholder}
            </BoardListInnerWrapper>
            )}
        </Droppable>

        <AddCard
          listId={list.id}
          boardId={boardId}
          onShowForm={(isFormVisible) => setFormVisible(isFormVisible)}
        />
      </BoardListWrapper>
    </Flex>
  );
};
