import React from 'react';
import { Row, Col, Typography } from 'antd';
import { PageHeader } from '../../shared/components/PageHeader';
import { TeamsList } from './TeamsList';
import { PersonalBoardsList } from './PersonalBoardsList';
import { TeamBoardsList } from './TeamBoardsList';
import { Flex } from '../../shared/components/Flex';


export const Dashboard: React.FC<{}> = () => {
  return (
    <React.Fragment>
      <PageHeader title="Dashboard" titleSize="large">
        <Flex>
          <Typography.Text>
            Manage your teams and boards here
          </Typography.Text>
        </Flex>
      </PageHeader>


      <Row gutter={16}>
        <Col sm={24} md={8}>
          <TeamsList/>
        </Col>
        <Col sm={24} md={16}>
          <PersonalBoardsList/>
          <TeamBoardsList/>
        </Col>
      </Row>
    </React.Fragment>
  );
};