import React from 'react';
import { Icon } from 'antd';
import { Flex, FlexProps } from './Flex';
import styled from '../styled';

const IconTitleWrapper = styled(Flex)<FlexProps>`
  i {
    margin-right: 10px;
  }
`;

interface IconTitleProps {
  title: React.ReactNode;
  iconType: string;
}

export const IconTitle: React.FC<IconTitleProps> = ({ title, iconType }) => (
  <IconTitleWrapper alignItems="center">
    <Icon type={iconType}/>
    {title}
  </IconTitleWrapper>
);