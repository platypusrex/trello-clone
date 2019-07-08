import React, { useState } from 'react';
import { Card } from 'antd';
import { TeamDetailTabContent } from './TeamDetailsTabContent';
import { TeamDetail } from '../../shared/types/generated';

export const teamDetailTabs = {
  Boards: 'Boards',
  Members: 'Members',
  Settings: 'Settings',
};

export type TabType = keyof typeof teamDetailTabs;

const teamDetailTabsList = [
  { key: teamDetailTabs.Boards, tab: teamDetailTabs.Boards },
  { key: teamDetailTabs.Members, tab: teamDetailTabs.Members },
  { key: teamDetailTabs.Settings, tab: teamDetailTabs.Settings },
];

interface ParentProps {
  loading: boolean;
  teamDetail: TeamDetail;
}

export const TeamDetailTabs: React.FC<ParentProps> = ({ loading, teamDetail }) => {
  const [ activeTab, setActiveTab ] = useState<TabType>(teamDetailTabs.Boards as TabType);

  return (
    <Card
      loading={loading}
      tabList={teamDetailTabsList}
      activeTabKey={activeTab}
      onTabChange={(key) => setActiveTab(key as TabType)}
    >
      <TeamDetailTabContent
        activeTab={activeTab}
        teamDetail={teamDetail}
      />
    </Card>
  )
};