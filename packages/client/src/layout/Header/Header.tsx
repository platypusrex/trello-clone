import React from 'react';
import { Layout } from 'antd';
import styled from '../../shared/styled';
import { BasicProps } from 'antd/lib/layout/layout';

const StyledHeader = styled(Layout.Header)<BasicProps>`
  position: fixed;
  z-index: 1;
  width: 100%;
`;

export const Header: React.FC<{}> = (props) => <StyledHeader {...props}/>;