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
}

export const AddCard: React.FC<ParentProps> = ({ listId }) => {
  const [ state, setState ] = useState<State>(initialState);

  const content = state.isAddCardFormVisible ? (
    <CreateCardForm listId={listId} onCancel={() => setState({ isAddCardFormVisible: false })}/>
  ) : (
    <CardButtonWrapper>
      <Button
        icon="plus"
        type="link"
        block={true}
        onClick={() => setState({ isAddCardFormVisible: true })}
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