import React, { useEffect, useState } from 'react'
import { Input, Select, notification, Card } from 'antd';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { funcionarioListar } from '../../../services/funcionarios';
import { doctorCrear, doctorEditar } from '../../../services/doctores';
import { especialidadListar } from '../../../services/especialidades';
import { obtenerEspecialidadesDoctor } from '../../../services/doctores_especialidades';
import withPageActions from '../../HOC/withPageActions';
import BotoneraFooterActions from '../../components/BotoneraFooterActions';
import ListaTransferir from '../../components/ListaTransferir';

const DoctorEditar = (props) => {
  const { onClickCancelar, validarPeticion,
    usuarioData: { token }, pageData: { selected } } = props
  const [funcionarios, setFuncionarios] = useState([])
  const [dataSource, setDataSource] = useState([])
  const [listado, setlistado] = useState([])
  const existe = !!selected?.id
  let titulo = "Editar doctor"
  const shape = {
    funcionario_id: yup.string().required("Favor seleccione al funcionario"),
  }
  if (!existe) {
    titulo = "Crear doctor"
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

  const openNotification = (type, descripcion) => {
    notification[type]({
      description: descripcion
    });
  };

  const listarFuncionarios = async () => {
    validarPeticion(funcionarioListar(token), actualizarListFuncionario)
  }

  const actualizarListFuncionario = (respuesta) => {
    const list = respuesta.datos.map(funcionario => {
      return {
        value: funcionario.id,
        label: (funcionario.nombres + " " + funcionario.apellidos)
      }
    })
    setFuncionarios(list)
  }

  const transferListDatasource = async () => {
    validarPeticion(especialidadListar(token), especialidadesTodos)
    if (existe) {
      validarPeticion(obtenerEspecialidadesDoctor(token, selected.id), especialidadesTiene)
    }
  }

  const especialidadesTodos = (respuesta) => {
    const format = respuesta.datos.map(row => {
      return {
        key: row.id,
        title: row.descripcion,
      }
    })
    setDataSource(format)
  }

  const especialidadesTiene = (respuesta) => {
    const format = respuesta.datos.map(row => {
      return row.especialidad_id
    })
    setlistado(format)
  }

  const actualizar = (datos) => {
    setlistado(datos)
  }

  const onSubmit = async doctor => {
    if (existe)
      validarPeticion(doctorEditar(token, { ...doctor, especialidades: listado }), () => { }, true)
    else
      validarPeticion(doctorCrear(token, { ...doctor, especialidades: listado }), () => { }, true)
  }

  return (
    <div className='row justify-content-center'>
      <Card title={titulo} className='col-md-6 col-sm-9 with-shadow'>
        <div className='row mb-2'>
          <Controller
            name="funcionario_id"
            control={control}
            render={({ field }) => <div className="col-md-6">
              <label className="ant-form-item-label">Funcionario: </label>
              <Select
                {...field}
                options={funcionarios}
              />
            </div>
            }
          />
          <Controller
            name="registro_profesional"
            control={control}
            render={({ field }) => <div className="col-md-6">
              <label className="ant-form-item-label">Registro profesional: </label>
              <Input
                {...field}
              />
            </div>
            }
          />
        </div>
        <ListaTransferir
          title="Especialidades "
          dataSource={dataSource}
          listado={listado}
          handleChange={actualizar} />
        <BotoneraFooterActions
          onClickCancelar={onClickCancelar}
          onClickAceptar={handleSubmit(onSubmit)}
        />
      </Card>
    </div>
  )
}

export default withPageActions(DoctorEditar)(null)
