import React from 'react';
import { Card as AntCard } from 'antd';
import { CardProps } from 'antd/lib/card';
import { Card } from '../../shared/types/generated';
import styled from '../../shared/styled';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';

const BoardCardWrapper = styled.div`
  &:not(:first-child) {
    margin-top: 10px;
  }
`;

const BoardCardInnerWrapper = styled.div`
  /* utility-name */
`;

const StyledBoardCard = styled(AntCard)<CardProps>`
  .ant-card-body {
    padding: 12px;
  }
`;

interface ParentProps {
  card: Card;
  index: number;
}

export const BoardCard: React.FC<ParentProps> = ({ card, index }) => {
  return (
    <Draggable
      key={card.title}
      draggableId={card.title}
      index={index}
    >
      {(provided: DraggableProvided) => (
        <BoardCardWrapper>
          <BoardCardInnerWrapper
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <StyledBoardCard hoverable={true}>
              <AntCard.Meta description={card.title}/>
            </StyledBoardCard>
          </BoardCardInnerWrapper>

          {provided.placeholder}
        </BoardCardWrapper>
      )}
    </Draggable>
  );
};
