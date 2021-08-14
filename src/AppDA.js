import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HorizontalLayout from './layout/horizontal/Horizontal';
import Main from './layout/main/Main';
import { defaultRoutes, sessionRoutes } from './routing';
import { useHideLoader } from './hooks/useHideLoader';
import './App.scss';
import DashboardPage from './pages/dashboards/dashboardDA/DashboardDA';

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

const inicioRutas = [
  {
    path: 'dashboard',
    component: DashboardPage
  },
];
const administracionRutas = [
  {
    path: 'usuarios',
    component: () => <div style={{ color: 'black' }}>usuarios</div>
  },
];
const rrhhRutas = [
  {
    path: 'funcionarios',
    component: () => <div style={{ color: 'black' }}>funcionarios</div>
  },
];
const configuracionRutas = [
  {
    path: 'roles',
    component: () => <div>roles</div>
  },
];
const stockRutas = [
  {
    path: 'insumos',
    component: () => <div>insumos</div>
  },
];
const facturacionRutas = [
  {
    path: 'presupuestos',
    component: () => <div>presupuestos</div>
  },
]

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
  </Switch>
);

const App = () => {
  useHideLoader();

  return (
    <Switch>
      <Route path='/public'>
        <NewRoutes routes={sessionRoutes} layout="public" />
      </Route>
      <Route path='/horizontal'>
        <HorizontalLayout>
          <DefaultRoutes layout='horizontal' />
        </HorizontalLayout>
      </Route>
      <Route path='/'>
        <Switch>
          <Main>
            <NewRoutes routes={inicioRutas} layout="inicio" />
            <NewRoutes routes={administracionRutas} layout="administracion" />
            <NewRoutes routes={rrhhRutas} layout="rrhh" />
            <NewRoutes routes={configuracionRutas} layout="configuracion" />
            <NewRoutes routes={stockRutas} layout="stock" />
            <NewRoutes routes={facturacionRutas} layout="facturacion" />
            <Route path='/' exact>
              <Redirect to='/inicio/dashboard' />
            </Route>
          </Main>
        </Switch>
      </Route>
    </Switch>
  );
};

export default App;
