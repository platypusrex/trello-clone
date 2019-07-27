import React from 'react';
import { Card as AntCard } from 'antd';
import { CardProps } from 'antd/lib/card';
import { Card } from '../../shared/types/generated';
import styled from '../../shared/styled';

const StyledBoardCard = styled(AntCard)<CardProps>`
  .ant-card-body {
    padding: 12px;
  }
`;

interface ParentProps {
  card: Card;
}

export const BoardCard: React.FC<ParentProps> = ({ card}) => {
  return (
    <StyledBoardCard hoverable={true}>
      <AntCard.Meta description={card.title}/>
    </StyledBoardCard>
  );
};