import ActualizarStock from "../pages/actualizarStock/ActualizarStock";
import CitasMedica from "../pages/citasMedica/CitasMedica";
import Cobranzas from "../pages/cobranzas/Cobranzas";
import DashboardPage from "../pages/dashboards/dashboardDA/DashboardDA";
import Doctores from "../pages/doctores/Doctores";
import Especialidades from "../pages/especialidades/Especialidades";
import Facturas from "../pages/facturas/Facturas";
import Funcionarios from "../pages/funcionarios/Funcionarios";
import Insumos from "../pages/insumos/Insumos";
import Pacientes from "../pages/pacientes/Pacientes";
import Presupuestos from "../pages/presupuestos/Presupuestos";
import Inventario from "../pages/reportes/Inventario";
import Roles from "../pages/roles/Roles";
import NotFound from "../pages/sessions/404";
import Login from "../pages/sessions/Login";
import TratamientosServicios from "../pages/tratamientosServicios/TratamientosServicios";
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
    layout: "administracion",
    path: 'citas-medica',
    component: CitasMedica
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
    layout: "configuracion",
    path: 'tratamientos-servicios',
    component: TratamientosServicios
  },
  {
    layout: "stock",
    path: 'insumos',
    component: Insumos
  },
  {
    layout: "stock",
    path: 'actualizar-stock',
    component: ActualizarStock
  },
  {
    layout: "facturacion",
    path: 'presupuestos',
    component: Presupuestos
  },
  {
    layout: "facturacion",
    path: 'facturas',
    component: Facturas
  },
  {
    layout: "facturacion",
    path: 'cobranzas',
    component: Cobranzas
  },
  {
    layout: "reportes",
    path: 'inventario',
    component: Inventario
  },
  {
    layout: "reportes",
    path: 'estado-cuenta',
    component: () => <div>estadocuenta</div>
  }
]

export { rutasPublicas, rutasPrivadas }