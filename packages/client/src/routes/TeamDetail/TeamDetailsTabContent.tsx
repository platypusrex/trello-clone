import React from 'react';
import { TabType, teamDetailTabs } from './TeamDetailTabs';
import { BoardsList } from '../../shared/components/board/BoardsList';
import { TeamMembers } from './TeamMembers';
import { TeamSettings } from './TeamSettings';
import { TeamDetail } from '../../shared/types/generated';

interface ParentProps {
  activeTab: TabType;
  teamDetail: TeamDetail
}

export const TeamDetailTabContent: React.FC<ParentProps> = ({ activeTab, teamDetail }) => {
  switch (activeTab) {
    case teamDetailTabs.Boards:
      return (
        <BoardsList
          boards={teamDetail.boards}
          teamId={teamDetail.id}
          colProps={{ xl: 6 }}
        />
      );

    case teamDetailTabs.Members:
      return <TeamMembers teamMembers={teamDetail.members}/>;

    case teamDetailTabs.Settings:
      return <TeamSettings/>;

    default: return null;
  }
}