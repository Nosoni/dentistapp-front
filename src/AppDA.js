import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HorizontalLayout from './layout/horizontal/Horizontal';
import Main from './layout/main/Main';
import { defaultRoutes } from './routing';
import { useHideLoader } from './hooks/useHideLoader';
import './App.scss';
import { rutasPrivadas, rutasPublicas } from './constantes/rutas';

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

const NewRoutes = ({ routes, layout }) => (
  <Switch>
    {
      routes.map((route, index) => <Route
        key={index}
        strict
        path={`/${route.layout}/${route.path}`}
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
        <NewRoutes routes={rutasPublicas} />
      </Route>
      <Route path='/horizontal'>
        <HorizontalLayout>
          <DefaultRoutes layout='horizontal' />
        </HorizontalLayout>
      </Route>
      <Route path='/'>
        <Main>
          <NewRoutes routes={rutasPrivadas} />
          <Route path='/' exact>
            <Redirect to='/inicio/dashboard' />
          </Route>
        </Main>
      </Route>
      <Route path='*'>
        <Redirect to='/public/page-404' />
      </Route>
    </Switch>
  );
};

export default App;
