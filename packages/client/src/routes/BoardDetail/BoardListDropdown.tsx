import React, { useState } from 'react';
import { Icon, Popover as AntPopover } from 'antd';
import { PopoverProps } from 'antd/lib/popover';
import { BoardListMenu } from './BoardListMenu';
import styled from '@emotion/styled';
import { UpdateListForm } from './UpdateListForm';
import { Flex } from '../../shared/components/Flex';
import { ListDetail } from '../../shared/types/generated';

const Popover = styled(AntPopover)<PopoverProps>`
  .ant-popover {
    min-width: 200px;
  }
  
  .ant-popover-inner-content {
    padding: 0 !important;
  }
`;

const DropdownButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  transition: background .15s ease-in-out;
  cursor: pointer;
  border-radius: 3px;
  
  &:hover {
    background: #f8f8f8;
    transition: background .15s ease-in-out;
  }
`;

const MoveListBackButton = styled.button`
  margin-right: 5px;
  padding: 0;
  border: none;
  cursor: pointer;
  
  i {
    position: relative;
    top: 1px;
    color: #999;
    transition: color .15s ease-in-out;
    
    &:hover {
      color: #777;
      transition: color .15s ease-in-out;
    }
  }
`

interface State {
  isMoveListFormVisible: boolean;
}
const initialState: State = {
  isMoveListFormVisible: false,
};

interface ParentProps {
  list: ListDetail;
  boardId: number;
  columnsLength: number;
}

export const BoardListDropdown: React.FC<ParentProps> = ({ boardId, list, columnsLength }) => {
  const [ state, setState ] = useState<State>(initialState);

  const content = state.isMoveListFormVisible ? (
    <UpdateListForm list={list} columnsLength={columnsLength}/>
  ) : (
    <BoardListMenu
      listId={list.id}
      boardId={boardId}
      onMoveList={() => setState({ isMoveListFormVisible: true })}
    />
  );

  const title = !state.isMoveListFormVisible ? (
    <span style={{ alignSelf: 'center' }}>List Actions</span>
  ) : (
    <React.Fragment>
      <MoveListBackButton onClick={() => setState({ isMoveListFormVisible: false})}>
        <Icon type="left"/>
      </MoveListBackButton>
      <span>Move List</span>
    </React.Fragment>
  );

  return (
    <Popover
      title={<Flex alignItems="center">{title}</Flex>}
      trigger="click"
      placement="bottomRight"
      content={content}
      arrowPointAtCenter={true}
      getPopupContainer={triggerNode => triggerNode}
      destroyTooltipOnHide={true}
      onVisibleChange={visible => !visible && setState({ isMoveListFormVisible: false })}
    >
      <DropdownButton>
        <Icon type="ellipsis"/>
      </DropdownButton>
    </Popover>
  );
};