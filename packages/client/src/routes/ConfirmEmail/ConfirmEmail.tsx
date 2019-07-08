import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Typography } from 'antd';
import { AuthWrapper } from '../../shared/styled/Shared';
import { Flex, FlexProps } from '../../shared/components/Flex';
import { ConfirmationCard } from './ConfirmationCard';
import { useConfirmEmail } from '../../shared/hooks/user/useConfirmEmail';
import styled from '../../shared/styled';

const ContentWrapper = styled(Flex)<FlexProps>`
  width: 100%;
`;

type Props = RouteComponentProps<{confirmationToken: string}>;

export const ConfirmEmail: React.FC<Props> = ({ history, match: { params } }) => {
  const { confirmEmail, loading } = useConfirmEmail(params.confirmationToken, history);

  return (
    <AuthWrapper>
      <ContentWrapper flexDirection="column" centerAll={true}>
        <ConfirmationCard>
          <Typography.Title level={1}>
            Hello!
          </Typography.Title>

          <Typography.Title level={4}>
            Welcome to Project Management Thing!
          </Typography.Title>

          <Typography.Paragraph>
            You are just one click away a kick ass project management experience.
          </Typography.Paragraph>

          <Button
            type="primary"
            size="large"
            htmlType="submit"
            onClick={confirmEmail}
            loading={loading}
          >
            Complete Account Setup
          </Button>
        </ConfirmationCard>
      </ContentWrapper>
    </AuthWrapper>
  );
};