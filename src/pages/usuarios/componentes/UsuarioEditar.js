import React, { useEffect, useState } from 'react'
import { Input, Select, notification, Card, Row, Col } from 'antd';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { funcionarioListar } from '../../../services/funcionarios';
import { usuarioCrear, usuarioEditar } from '../../../services/usuarios';
import { rolListar } from '../../../services/roles';
import { obtenerRolesDelUsuario } from '../../../services/usuarios_roles';
import withPageActions from '../../HOC/withPageActions';
import ListaTransferir from '../../components/ListaTransferir';
import BotoneraFooterActions from '../../components/BotoneraFooterActions';

const UsuarioEditar = (props) => {
  const { onClickCancelar, validarPeticion, openNotification,
    usuarioData: { token }, pageData: { selected } } = props
  const [funcionarios, setFuncionarios] = useState([])
  const [dataSource, setDataSource] = useState([])
  const [listado, setlistado] = useState([])
  const existe = !!selected?.id
  let titulo = "Editar usuario"
  const shape = {
    usuario: yup.string().required("Favor introduzca el Usuario")
  }
  if (!existe) {
    shape.password = yup.string().required("Favor introduzca la contraseña")
    shape.confirmar = yup.string().required("Favor confirme la contraseña")
    titulo = "Crear usuario"
  }
  const schema = yup.object(shape)
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: selected,
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    listarFuncionarios()
    transferListDatasource()
  }, [])

  useEffect(() => {
    if (errors) {
      Object.entries(errors).forEach(([key, value]) => {
        openNotification("error", value.message)
      });
    }
  }, [errors])

  const listarFuncionarios = async () => {
    validarPeticion(funcionarioListar(token), actualizarListFuncionario)
  }

  const actualizarListFuncionario = (respuesta) => {
    const list = respuesta.datos.map(funcionario => {
      return {
        value: funcionario.id,
        label: `${funcionario.nombres} ${funcionario.apellidos}`
      }
    })
    setFuncionarios(list)
  }

  const transferListDatasource = async () => {
    validarPeticion(rolListar(token), rolesTodos)
    if (existe) {
      validarPeticion(obtenerRolesDelUsuario(token, selected.id), rolesTiene)
    }
  }

  const rolesTodos = (respuesta) => {
    const format = respuesta.datos.map(row => {
      return {
        key: row.id,
        title: row.nombre,
        description: row.descripcion,
      }
    })
    setDataSource(format)
  }

  const rolesTiene = (respuesta) => {
    const format = respuesta.datos.map(row => {
      return row.id
    })
    setlistado(format)
  }

  const actualizar = (datos) => {
    setlistado(datos)
  }

  const onSubmit = async usuario => {
    if (existe)
      validarPeticion(usuarioEditar(token, { ...usuario, roles: listado }), () => { }, true)
    else
      validarPeticion(usuarioCrear(token, { ...usuario, roles: listado }), () => { }, true)
  }

  // de muestra
  // const cardTitulo = () => {
  //   return <div className="row justify-content-between m-0 p-0">
  //     {titulo}
  //     <Button onClick={() => { }} shape='circle' className="bg-color-error">
  //       <span className='icofont icofont-ui-delete' />
  //     </Button>
  //   </div>
  // }

  return (
    <div className='row justify-content-center'>
      <Card title={titulo} className='col-md-9 col-sm-6 with-shadow'>
        <Row>
          <Col className='col-4 col-md-4'>
            <Controller
              name="usuario"
              control={control}
              render={({ field }) => <div className="mb-2">
                <label className="ant-form-item-label">Usuario: </label>
                <Input
                  {...field}
                  disabled={existe}
                />
              </div>
              }
            />
            <Controller
              name="funcionario_id"
              control={control}
              render={({ field }) => <div className="mb-2">
                <label className="ant-form-item-label">Funcionario: </label>
                <Select
                  {...field}
                  options={funcionarios}
                  allowClear
                />
              </div>
              }
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => <div className="mb-2">
                <label className="ant-form-item-label">Contraseña: </label>
                <Input
                  {...field}
                  type="password"
                />
              </div>
              }
            />
            <Controller
              name="confirmar"
              control={control}
              render={({ field }) => <div className="mb-2">
                <label className="ant-form-item-label">Confirmar contraseña: </label>
                <Input
                  {...field}
                  type="password"
                />
              </div>
              }
            />
          </Col>
          <Col className='col-8 col-md-8'>
            <ListaTransferir
              title="Roles"
              dataSource={dataSource}
              listado={listado}
              handleChange={actualizar} />
          </Col>
        </Row>
        <BotoneraFooterActions
          onClickCancelar={onClickCancelar}
          onClickAceptar={handleSubmit(onSubmit)}
        />
      </Card>
    </div>
  )
}

export default withPageActions(UsuarioEditar)(null)
