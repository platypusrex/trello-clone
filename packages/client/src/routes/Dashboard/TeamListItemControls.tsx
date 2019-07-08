import React from 'react';
import { Button, Popconfirm, Tooltip } from 'antd';
import { Flex, FlexProps } from '../../shared/components/Flex';
import { Team } from '../../shared/types/generated';
import { useDeleteTeamById } from '../../shared/hooks/team/useDeleteTeamById';
import styled from '../../shared/styled';

const ControlsWrapper = styled(Flex)<FlexProps>`
  button {
    border: none;
  }
  
  button:first-child {
    margin-right: 5px;
  }
`;

interface ParentProps {
  team: Team;
  onEditClick: () => void;
}

export const TeamListItemControls: React.FC<ParentProps> = ({ team, onEditClick }) => {
  const { deleteTeam, loading } = useDeleteTeamById(team.id);

  const handleDeleteTeam = async () => {
    try {
      await deleteTeam();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ControlsWrapper className="team-list-item__controls">
      <Tooltip title="Edit team">
        <Button size="small" icon="edit" onClick={onEditClick}/>
      </Tooltip>

      <Popconfirm
        title={`Delete ${team.name}?`}
        onConfirm={handleDeleteTeam}
        placement="topRight"
        okButtonProps={{ loading }}
      >
        <Button type="danger" size="small" icon="delete"/>
      </Popconfirm>
    </ControlsWrapper>
  );
};