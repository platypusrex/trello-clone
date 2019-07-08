import React from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './layout/Layout';
import { Login } from './routes/Login/Login';
import { Register } from './routes/Register/Register';
import { Dashboard } from './routes/Dashboard/Dashboard';
import { ConfirmEmail } from './routes/ConfirmEmail/ConfirmEmail';
import { TeamDetail } from './routes/TeamDetail/TeamDetail';
import { BoardDetail } from './routes/BoardDetail/BoardDetail';
import { Routes } from './shared/constants/routes';

export const App: React.FC<{}> = () => {
  const appRoutes = (
    <Layout>
      <Switch>
        <Route exact={true} path={Routes.DASHBOARD} component={Dashboard}/>
        <Route exact={true} path={Routes.TEAM_DETAIL} component={TeamDetail}/>
        <Route exact={true} path={Routes.BOARD_DETAIL} component={BoardDetail}/>
      </Switch>
    </Layout>
  );

  return (
    <Switch>
      <Route exact={true} path={Routes.LOGIN} component={Login}/>
      <Route exact={true} path={Routes.REGISTER} component={Register}/>
      <Route exact={true} path={Routes.CONFIRM} component={ConfirmEmail}/>
      <Route render={() => appRoutes}/>
    </Switch>
  );
};