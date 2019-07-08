import React from 'react';
import { Card } from 'antd';
import { CardProps } from 'antd/lib/card';
import { ListDetail } from '../../shared/types/generated';
import { CardList } from './CardList';
import { BoardListDropdown } from './BoardListDropdown';
import styled from '../../shared/styled';
import { AddCard } from './AddCard';
import { Flex } from '../../shared/components/Flex';

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

interface ParentProps {
  list: ListDetail;
  boardId: number;
  columnsLength: number;
}

export const BoardList: React.FC<ParentProps> = ({ list, boardId, columnsLength }) => {
  const extra = (
    <BoardListDropdown
      list={list}
      boardId={boardId}
      columnsLength={columnsLength}
    />
  );

  return (
    <Flex style={{ minHeight: '60vh' }}>
      <BoardListWrapper
        title={list.title}
        extra={extra}
      >
        <CardList listId={list.id}>
          <AddCard listId={list.id}/>
        </CardList>
      </BoardListWrapper>
    </Flex>
  );
};