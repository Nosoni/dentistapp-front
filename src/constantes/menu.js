const menues = [
  {
    layout: "administracion",
    title: "Administración",
    sub: [{
      title: "Usuarios",
      routing: "usuarios"
    }]
  },
  {
    layout: "rrhh",
    title: "Recursos Humanos",
    sub: [{
      title: "Funcionarios",
      routing: "funcionarios"
    }]
  },
  {
    layout: "configuracion",
    title: "Configuración",
    sub: [{
      title: "Roles",
      routing: "roles"
    }]
  },
  {
    layout: "stock",
    title: "Stock",
    sub: [{
      title: "Insumos",
      routing: "insumos"
    }]
  },
  {
    layout: "facturacion",
    title: "Facturación",
    sub: [{
      title: "Presupuestos",
      routing: "presupuestos"
    }]
  },
  {
    layout: "reportes",
    title: "Reportes",
  }
]

export { menues }