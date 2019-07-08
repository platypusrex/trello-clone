import React, { useState } from 'react';
import { Button } from 'antd';
import styled from '../../shared/styled';
import { Modal } from '../../shared/components/Modal';
import { CreateBoardForm } from '../../shared/components/board/CreateBoardForm';

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 140px;
  height: 100%;
` as any;

interface State {
  isCreateBoardModalVisible: boolean;
}
const initialState: State = {
  isCreateBoardModalVisible: false,
};

interface ParentProps {
  teamId?: number;
}

export const AddBoardButton: React.FC<ParentProps> = ({ teamId }) => {
  const [ state, setState ] = useState<State>(initialState);

  const handleShowCreateBoardModal = () => setState({ isCreateBoardModalVisible: true });
  const handleHideCreateBoardModal = () => setState({ isCreateBoardModalVisible: false });

  return (
    <>
      <StyledButton block={true} onClick={handleShowCreateBoardModal}>
        Add Board
      </StyledButton>

      <Modal
        title="Add Board"
        visible={state.isCreateBoardModalVisible}
        onCancel={handleHideCreateBoardModal}
      >
        <CreateBoardForm
          teamId={teamId}
          onCancel={handleHideCreateBoardModal}
        />
      </Modal>
    </>
  );
};