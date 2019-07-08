import React, { useState } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { Flex, FlexProps } from '../../shared/components/Flex';
import styled from '../../shared/styled';
import { CreateListForm } from './CreateListForm';

const AddListWrapper = styled(({ isFormVisible, ...rest }) =>
  <Flex {...rest}/>)<FlexProps & { isFormVisible: boolean; }>`
    min-width: 300px;
    height: 44px;
    background: #fff;
    border: 1px solid #e8e8e8;
    
    ${({ isFormVisible }) => isFormVisible && `
      height: fit-content;
      padding: 10px;
    `};
  `;

const ListButton = styled(props => <Button {...props}/>)<ButtonProps>`
  height: 100%;
  width: 100%;
  color: inherit;
  text-align: left;
  font-size: 14px;
  
  &:hover {
    color: #1890ff;
  }
`;

interface State {
  isFormVisible: boolean;
}
const initialState: State = {
  isFormVisible: false,
};

interface ParentProps {
  boardId: number;
}

export const AddList: React.FC<ParentProps> = ({ boardId }) => {
  const [ state, setState ] = useState<State>(initialState);

  const content = state.isFormVisible ? (
    <CreateListForm
      boardId={boardId}
      onCancel={() => setState({ isFormVisible: false })}
    />
  ) : (
    <ListButton
      type="link"
      icon="plus"
      onClick={() => setState({ isFormVisible: true })}
    >
      Add another list...
    </ListButton>
  );

  return (
    <AddListWrapper isFormVisible={state.isFormVisible}>
      {content}
    </AddListWrapper>
  );
};