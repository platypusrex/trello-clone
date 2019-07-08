import React, { useCallback } from 'react';
import { Menu as AntMenu } from 'antd';
import { ClickParam, MenuProps } from 'antd/lib/menu';
import { useDeleteListById } from '../../shared/hooks/list/useDeleteListById';
import styled from '../../shared/styled';

const Menu = styled(AntMenu)<MenuProps>`
  .ant-menu {
    border: none;
  }
  
  .ant-menu-item {
    height: 38px;
    margin: 0 !important;
    
    &:hover,
    &:active {
      background-color: #e6f7ff;
    }
  }
`;

const menuKeys: { [key: string]: string } = {
  delete: 'Delete List',
  move: 'Move List'
};

interface ParentProps {
  listId: number;
  boardId: number;
  onMoveList: () => void;
}

export const BoardListMenu: React.FC<ParentProps> = ({ boardId, listId, onMoveList }) => {
  const { deleteList } = useDeleteListById();

  const onMenuItemSelect = useCallback(async (params: ClickParam) => {
    switch (params.key) {
      case menuKeys.delete:
        await deleteList(listId, boardId);
        return;
      case menuKeys.move:
        onMoveList();
        return;
      default:
        throw new Error('BoardListDropdown menu select: menu item key not provided');
    }
  }, [deleteList, listId, boardId, onMoveList]);

  return (
    <Menu onClick={onMenuItemSelect}>
      {Object.keys(menuKeys).map((key) => (
        <AntMenu.Item key={menuKeys[key]}>
          {menuKeys[key]}
        </AntMenu.Item>
      ))}
    </Menu>
  );
};