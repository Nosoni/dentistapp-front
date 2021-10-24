import DashboardPage from "../pages/dashboards/dashboardDA/DashboardDA";
import Doctores from "../pages/doctores/Doctores";
import Especialidades from "../pages/especialidades/Especialidades";
import Funcionarios from "../pages/funcionarios/Funcionarios";
import Pacientes from "../pages/pacientes/Pacientes";
import Roles from "../pages/roles/Roles";
import NotFound from "../pages/sessions/404";
import Login from "../pages/sessions/Login";
import Usuarios from "../pages/usuarios/Usuarios";

const rutasPublicas = [
  {
    layout: "public",
    path: 'page-404',
    component: NotFound
  },
  {
    layout: "public",
    path: 'login',
    component: Login
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
    component: Usuarios
  },
  {
    layout: "administracion",
    path: 'pacientes',
    component: Pacientes
  },
  {
    layout: "rrhh",
    path: 'doctores',
    component: Doctores
  },
  {
    layout: "rrhh",
    path: 'funcionarios',
    component: Funcionarios
  },
  {
    layout: "rrhh",
    path: 'especialidades',
    component: Especialidades
  },
  {
    layout: "configuracion",
    path: 'roles',
    component: Roles
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