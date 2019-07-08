import React from 'react';
import { List } from 'antd';
import { User } from '../../shared/types/generated';

interface ParentProps {
  teamMembers: User[];
}

export const TeamMembers: React.FC<ParentProps> = ({ teamMembers }) => {
  return (
    <List
      dataSource={teamMembers}
      renderItem={(member) => <List.Item>{member.fullName}</List.Item>}
    />
  );
};