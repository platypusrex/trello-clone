import React from 'react';
import { Layout as AntLayout } from 'antd';
import { Page } from '../shared/components/Page';
import { Header } from './Header/Header';

const { Content } = AntLayout;

export const Layout: React.FC<{}> = ({ children }) => (
  <AntLayout style={{ overflowX: 'hidden' }}>
    <Header/>

    <Content style={{ marginTop: 64 }}>
      <Page>
        {children}
      </Page>
    </Content>
  </AntLayout>
);