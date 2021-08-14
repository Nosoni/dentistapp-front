import DashboardPage from "../pages/dashboards/dashboardDA/DashboardDA";
import NotFound from "../pages/sessions/404";
import SignIn from "../pages/sessions/Sign-in";
import Usuario from "../pages/usuarios/Usuario";

const rutasPublicas = [
  {
    layout: "public",
    path: 'page-404',
    component: NotFound
  },
  {
    layout: "public",
    path: 'sign-in',
    component: SignIn
  }
];

const rutasPrivadas = [
  {
    layout: "inicio",
    path: 'dashboard',
    component: DashboardPage
  },
  {
    layout: "administracion",
    path: 'usuarios',
    component: Usuario
  },
  {
    layout: "rrhh",
    path: 'funcionarios',
    component: () => <div style={{ color: 'black' }}>funcionarios</div>
  },
  {
    layout: "configuracion",
    path: 'roles',
    component: () => <div>roles</div>
  },
  {
    layout: "stock",
    path: 'insumos',
    component: () => <div>insumos</div>
  },
  {
    layout: "facturacion",
    path: 'presupuestos',
    component: () => <div>presupuestos</div>
  },
]

export { rutasPublicas, rutasPrivadas }