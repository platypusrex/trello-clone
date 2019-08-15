import React, { useState } from 'react';
import { Button } from 'antd';
import { Flex, FlexProps } from '../../shared/components/Flex';
import styled from '../../shared/styled';
import { CreateCardForm } from './CreateCardForm';

const CardButtonWrapper = styled(Flex)<FlexProps>`
  .ant-btn {
    text-align: left;
    min-height: 42px;
    font-size: 13px;
    color: inherit;
  
    &:hover {
      span {
        text-decoration: underline;
      }
    }  
  }   
`;

interface State {
  isAddCardFormVisible: boolean;
}
const initialState: State = {
  isAddCardFormVisible: false,
};

interface ParentProps {
  listId: number;
  boardId: number;
  onShowForm: (isFormVisible: boolean) => void;
}

export const AddCard: React.FC<ParentProps> = ({ listId, boardId, onShowForm }) => {
  const [ state, setState ] = useState<State>(initialState);
  const handleShowCardForm = (isAddCardFormVisible: boolean) => {
    setState({ isAddCardFormVisible });
    onShowForm(isAddCardFormVisible);
  };

  const content = state.isAddCardFormVisible ? (
    <CreateCardForm
      listId={listId}
      boardId={boardId}
      onCancel={() => handleShowCardForm(false)}
    />
  ) : (
    <CardButtonWrapper>
      <Button
        icon="plus"
        type="link"
        block={true}
        onClick={() => handleShowCardForm(true)}
      >
        Add another card...
      </Button>
    </CardButtonWrapper>
  );

  return (
    <React.Fragment>
      {content}
    </React.Fragment>
  );
};
