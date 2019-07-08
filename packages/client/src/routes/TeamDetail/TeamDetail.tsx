import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Typography } from 'antd';
import { PageHeader } from '../../shared/components/PageHeader';
import { TeamDetailTabs } from './TeamDetailTabs';
import { useTeamsDetailById } from '../../shared/hooks/team/useTeamDetailById';

type Props = RouteComponentProps<{teamId: string}>;

export const TeamDetail: React.FC<Props> = ({ history, match: { params }}) => {
  const { teamDetail, loading } = useTeamsDetailById(parseInt(params.teamId, 10));

  if (!teamDetail) {
    return null;
  }

  return (
    <React.Fragment>
      <PageHeader
        onBack={() => history.goBack()}
        title={teamDetail.name}
      >
        <Typography.Text>
          {teamDetail.description}
        </Typography.Text>
      </PageHeader>

      <TeamDetailTabs
        loading={loading}
        teamDetail={teamDetail}
      />
    </React.Fragment>
  );
};
