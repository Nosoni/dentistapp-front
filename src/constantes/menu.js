import { permisos } from "./index"

const menues = [
  //#region administracion
  {
    layout: "administracion",
    title: "Administración",
    sub: [{
      title: "Usuarios",
      routing: "usuarios",
      permiso: permisos.VER_MENU_USUARIO
    }, {
      title: "Pacientes",
      routing: "pacientes",
      permiso: permisos.VER_MENU_PACIENTE
    }]
  }
  //#endregion administracion
  //#region rrhh
  , {
    layout: "rrhh",
    title: "Recursos Humanos",
    sub: [{
      title: "Funcionarios",
      routing: "funcionarios",
      permiso: permisos.VER_MENU_FUNCIONARIO
    }, {
      title: "Doctores",
      routing: "doctores",
      permiso: permisos.VER_MENU_DOCTOR
    }, {
      title: "Especialidades",
      routing: "especialidades",
      permiso: permisos.VER_MENU_ESPECIALIDAD
    }]
  }
  //#endregion rrhh
  //#region configuracion
  , {
    layout: "configuracion",
    title: "Configuración",
    sub: [{
      title: "Roles",
      routing: "roles",
      permiso: permisos.VER_MENU_ROL
    }]
  }
  //#endregion configuracion
  //#region insumos
  , {
    layout: "stock",
    title: "Stock",
    sub: [{
      title: "Insumos",
      routing: "insumos",
      permiso: ""
    }]
  }
  //#endregion insumos
  //#region facturacion
  , {
    layout: "facturacion",
    title: "Facturación",
    sub: [{
      title: "Presupuestos",
      routing: "presupuestos",
      permiso: ""
    }]
  }
  //#endregion facturacion
  //#region reportes
  , {
    layout: "reportes",
    title: "Reportes",
    permiso: ""
  }
  //#endregion reportes
]

export { menues }