import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HorizontalLayout from './layout/horizontal/Horizontal';
import MainLayout from './layout/main/Main';
import { defaultRoutes, sessionRoutes } from './routing';
import { useHideLoader } from './hooks/useHideLoader';
import './App.scss';

//eliminar una vez establecidos los routes
const Routes = ({ routes, layout = '' }) => (
  <Switch>
    {routes.map((route, index) => (
      <Route
        key={index}
        exact={route.exact}
        path={layout.length > 0 ? `/${layout}/${route.path}` : `/${route.path}`}
        component={() => <route.component />}
      />
    ))}

    <Route path='*'>
      <Redirect to='/page-404' />
    </Route>
  </Switch>
);
const DefaultRoutes = ({ layout }) => <Routes routes={defaultRoutes} layout={layout} />;

const DARoutes = () => <NewRoutes routes={defaultRoutes} layout="inicio" />;
const SessionRoutes = () => <NewRoutes routes={sessionRoutes} layout="public" />;
const NewRoutes = ({ routes, layout }) => (
  <Switch>
    {
      routes.map((route, index) => <Route
        key={index}
        exact={route.exact}
        path={`/${layout}/${route.path}`}
        component={() => <route.component />}
      />
      )
    }

    <Route path='*'>
      <Redirect to='/public/page-404' />
    </Route>
  </Switch>
);

const App = () => {
  useHideLoader();

  return (
    <Switch>
      <Route path='/public'>
        <SessionRoutes />
      </Route>
      <Route path='/horizontal'>
        <HorizontalLayout>
          <DefaultRoutes layout='horizontal' />
        </HorizontalLayout>
      </Route>
      <Route path='/inicio'>
        <MainLayout>
          <DARoutes />
        </MainLayout>
      </Route>
      <Route path='/' exact>
        <Redirect to='/inicio/doctors' />
      </Route>
      <Route path='*'>
        <Redirect to='/public/page-404' />
      </Route>
    </Switch>
  );
};

export default App;
