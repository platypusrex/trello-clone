import React from 'react';
// import { Draggable, DraggableProvided, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { Flex, FlexProps } from '../../shared/components/Flex';
import { BoardCard } from './BoardCard';
import { useCardsByListId } from '../../shared/hooks/card/useCardsByListId';
import styled from '../../shared/styled';

const CardsWrapper = styled(Flex)<FlexProps>`
  padding: 12px 12px 0;
  .ant-card {
    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }
`;

interface ParentProps {
  listId: number;
}

export const CardList: React.FC<ParentProps> = ({ listId, children }) => {
  const { cards } = useCardsByListId(listId);

  if (!cards || cards.length < 0) {
    return null;
  }

  return (
    <Flex flexDirection="column">
      <CardsWrapper flexDirection="column">
        {cards.map(card => <BoardCard key={card.id} card={card}/>)}
      </CardsWrapper>

      {children}
    </Flex>
  );

  // return (
  //   <Flex flexDirection="column">
  //     <Droppable
  //       droppableId="card-list"
  //       type="CARD"
  //       isDropDisabled={false}
  //       ignoreContainerClipping={true}
  //     >
  //       {( dropProvided: DroppableProvided) => (
  //         <Flex flexDirection="column" ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
  //           <div>
  //             {cards.map((card, i) => (
  //               <Draggable key={`card__${card.id}`} draggableId={`card__${card.id}`} index={i}>
  //                 {(provided: DraggableProvided) => (
  //                   <div style={{ padding: 12, paddingBottom: 0 }}>
  //                     <div
  //                       ref={provided.innerRef}
  //                       {...provided.draggableProps}
  //                       {...provided.dragHandleProps}
  //                     >
  //                       <Card key={card.id} bodyStyle={{ padding: 12 }} hoverable={true}>
  //                         <Card.Meta description={card.title}/>
  //                       </Card>
  //                     </div>
  //
  //                     {provided.placeholder}
  //                   </div>
  //                 )}
  //               </Draggable>
  //             ))}
  //
  //             {dropProvided.placeholder}
  //           </div>
  //         </Flex>
  //       )}
  //     </Droppable>
  //
  //     {children}
  //   </Flex>
  // );
};