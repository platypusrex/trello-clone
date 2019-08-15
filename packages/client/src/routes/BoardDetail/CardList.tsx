import React from 'react';
import { Flex, FlexProps } from '../../shared/components/Flex';
import { BoardCard } from './BoardCard';
import { Card } from '../../shared/types/generated';
import styled from '../../shared/styled';

const CardsWrapper = styled(Flex)<FlexProps & { cardsLength: number; }>`
  padding: ${({ cardsLength }) => cardsLength > 0 ? 12 : 0}px 12px 0;
  
  .ant-card {
    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }
`;

interface ParentProps {
  cards: Card[] | null;
}

export const CardList: React.FC<ParentProps> = ({ cards }) => {
  if (!cards || cards.length < 0) {
    return null;
  }

  return (
    <Flex flexDirection="column">
      <CardsWrapper flexDirection="column" cardsLength={cards.length}>
        {cards.map((card, i) => (
          <BoardCard key={card.id} card={card} index={i}/>)
        )}
      </CardsWrapper>
    </Flex>
  );
};
