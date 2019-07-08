import React, { useState } from 'react';
import { Button, Card, List, Tooltip } from 'antd';
import { CardProps } from 'antd/lib/card';
import { TeamListItem } from './TeamListItem';
import { CreateTeamForm } from '../../shared/components/team/CreateTeamForm';
import { Modal } from '../../shared/components/Modal';
import { Team } from '../../shared/types/generated';
import { useTeamsByUserId } from '../../shared/hooks/team/useTeamsByUserId';
import styled from '../../shared/styled';

const TeamListCard = styled(Card)<CardProps>`
  margin-bottom: 16px;
  
  .ant-card-body {
    padding: 8px 24px;
  }
`;

interface State {
  isCreateTeamModalVisible: boolean;
}
const initialState: State = {
  isCreateTeamModalVisible: false,
};

export const TeamsList: React.FC<{}> = () => {
  const { teams, loading } = useTeamsByUserId();
  const [ state, setState ] = useState<State>(initialState);

  const showCreateTeamModal = () => setState({ isCreateTeamModalVisible: true });
  const hideCreateTeamModal = () => setState({ isCreateTeamModalVisible: false });

  const extra = (
    <Tooltip title="Add team">
      <Button
        size="small"
        onClick={showCreateTeamModal}
        icon="plus"
      />
    </Tooltip>
  );

  return (
    <React.Fragment>
      <TeamListCard
        title="Teams"
        hoverable={true}
        extra={extra}
      >
        <List
          size="small"
          loading={loading}
          dataSource={teams}
          renderItem={(team: Team) => <TeamListItem team={team}/>}
        />
      </TeamListCard>

      <Modal
        title="Create Team"
        visible={state.isCreateTeamModalVisible}
        onCancel={hideCreateTeamModal}
      >
        <CreateTeamForm onCancel={hideCreateTeamModal}/>
      </Modal>
    </React.Fragment>
  )
};