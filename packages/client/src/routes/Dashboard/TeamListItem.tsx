import React, { useState } from 'react';
import { generatePath, Link, LinkProps } from 'react-router-dom';
import { List } from 'antd';
import { ListItemProps } from 'antd/lib/list';
import { Team } from '../../shared/types/generated';
import { TeamListItemControls } from './TeamListItemControls';
import { UpdateTeamForm } from '../../shared/components/team/UpdateTeamForm';
import { Routes } from '../../shared/constants/routes';
import styled from '../../shared/styled';

const ListLink = styled(Link)<LinkProps>`
  color: inherit;
`;

const ListItem = styled(List.Item)<ListItemProps>`
  .team-list-item__controls {
    display: none;
  }
  
  &:hover {
    .team-list-item__controls {
      display: initial;
    }
  }
`;

interface State {
  isEditingTeam: boolean;
  isDeletingTeam: boolean;
}
const initialState: State = {
  isEditingTeam: false,
  isDeletingTeam: false
};

interface ParentProps {
  team: Team;
}

export const TeamListItem: React.FC<ParentProps> = ({ team }) => {
  const [ state, setState ] = useState<State>(initialState);

  const handleShowEditTeamForm = () => setState(ss => ({ ...ss, isEditingTeam: true }));
  const handleHideEditTeamForm = () => setState(ss => ({ ...ss, isEditingTeam: false }));

  const extra = !state.isEditingTeam && (
    <TeamListItemControls onEditClick={handleShowEditTeamForm} team={team}/>
  );

  const teamLink = (
    <ListLink to={generatePath(Routes.TEAM_DETAIL, { teamId: team.id })}>
      {team.name}
    </ListLink>
  );

  const content = !state.isEditingTeam ? (
    <List.Item.Meta title={teamLink} description={team.description}/>
  ) : (
    <UpdateTeamForm team={team} onCancel={handleHideEditTeamForm}/>
  );


  return (
    <ListItem extra={extra}>
      {content}
    </ListItem>
  );
};
