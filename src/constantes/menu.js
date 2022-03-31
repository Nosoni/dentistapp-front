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
    }, {
      title: "Clientes",
      routing: "clientes",
      permiso: permisos.VER_MENU_CLIENTE
    }, {
      title: "Citas médicas",
      routing: "citas-medica",
      permiso: permisos.VER_MENU_CITA_MEDICA
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
  //#region stock
  , {
    layout: "stock",
    title: "Stock",
    sub: [{
      title: "Productos y Servicios",
      routing: "productos-servicios",
      permiso: permisos.VER_MENU_PRODUCTO_SERVICIO
    }, {
      title: "Actualizar stock",
      routing: "actualizar-stock",
      permiso: permisos.VER_MENU_ACTUALIZAR_STOCK
    }]
  }
  //#endregion stock
  //#region facturacion
  , {
    layout: "facturacion",
    title: "Facturación",
    sub: [{
      title: "Presupuestos",
      routing: "presupuestos",
      permiso: permisos.VER_MENU_PRESUPUESTO
    }, {
      title: "Facturas",
      routing: "facturas",
      permiso: permisos.VER_MENU_FACTURACION
    }, {
      title: "Cobranzas",
      routing: "cobranzas",
      permiso: permisos.VER_MENU_COBRANZA
    }]
  }
  //#endregion facturacion
  //#region reportes
  , {
    layout: "reportes",
    title: "Reportes",
    sub: [{
      title: "Inventario",
      routing: "inventario",
      permiso: permisos.VER_MENU_REPORTE_INVENTARIO
    }, {
      title: "Estado de cuenta",
      routing: "estado-cuenta",
      permiso: permisos.VER_MENU_REPORTE_FACTURACION
    }]
  }
  //#endregion reportes
]

export { menues }