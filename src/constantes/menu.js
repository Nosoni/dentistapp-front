import { permisos } from "./index"

const menues = [
  {
    layout: "administracion",
    title: "Administración",
    sub: [{
      title: "Usuarios",
      routing: "usuarios",
      permiso: permisos.VER_MENU_USUARIO
    }]
  },
  {
    layout: "rrhh",
    title: "Recursos Humanos",
    sub: [{
      title: "Funcionarios",
      routing: "funcionarios",
      permiso: ""
    }]
  },
  {
    layout: "configuracion",
    title: "Configuración",
    sub: [{
      title: "Roles",
      routing: "roles",
      permiso: ""
    }]
  },
  {
    layout: "stock",
    title: "Stock",
    sub: [{
      title: "Insumos",
      routing: "insumos",
      permiso: ""
    }]
  },
  {
    layout: "facturacion",
    title: "Facturación",
    sub: [{
      title: "Presupuestos",
      routing: "presupuestos",
      permiso: ""
    }]
  },
  {
    layout: "reportes",
    title: "Reportes",
    permiso: ""
  }
]

export { menues }