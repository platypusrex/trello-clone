import React from 'react';
import { PageHeader as AntPageHeader } from 'antd';
import { PageHeaderProps as AntPageHeaderProps } from 'antd/lib/page-header';
import styled from '../styled';

const StyledPageHeader = styled(AntPageHeader)<PageHeaderProps & { titleSize?: TitleSize }>`
  margin-bottom: 16px; 
  
  .ant-page-header-title-view-title {
    font-size: ${({ titleSize }) => titleSize === 'large' ? '24px' : 'initial'};
  }
  
  .ant-page-header-content-view {
    ${({ titleSize }) => titleSize === 'large' && 'padding: 0'};
  }
`;

type TitleSize = 'default' | 'large';

interface PageHeaderProps extends AntPageHeaderProps {
  titleSize?: TitleSize;
}

export const PageHeader: React.FC<PageHeaderProps> = (props) => (
  <StyledPageHeader {...props}>
    {props.children}
  </StyledPageHeader>
);