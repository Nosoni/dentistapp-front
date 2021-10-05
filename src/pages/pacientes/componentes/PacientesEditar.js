import React, { useEffect, useState } from 'react'
import withPageActions from '../../HOC/withPageActions'
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Input, notification, Select } from 'antd';
import { pacienteCrear, pacienteEditar } from '../../../services/pacientes';
import BotoneraFooterActions from '../../components/BotoneraFooterActions';
import moment from 'moment';
import DateTimePicker from '../../components/DateTimePicker';
import { tiposDocumentosListar } from '../../../services/tipos_documentos';

const PacientesEditar = (props) => {
  const { onClickCancelar, validarPeticion } = props
  const { token } = props.usuarioData;
  const { selected } = props.pageData;
  selected.fecha_nacimiento = !!selected.fecha_nacimiento && moment.utc(selected.fecha_nacimiento)
  const [tiposDocumentos, setTiposDocumentos] = useState([])
  const existe = !!selected?.id
  let titulo = "Editar paciente"
  const shape = {
    documento: yup.string().required("Favor introduzca el documento"),
    tipo_documento_id: yup.string().required("Favor seleccione el tipo documento"),
    nombres: yup.string().required("Favor introduzca el nombre"),
    apellidos: yup.string().required("Favor introduzca el apellido"),
  }
  if (!existe) {
    titulo = "Crear paciente"
  }
  const schema = yup.object(shape)
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: selected,
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (errors) {
      Object.entries(errors).forEach(([key, value]) => {
        openNotification("error", value.message)
      });
    }
  }, [errors])

  useEffect(() => {
    listarTiposDocumentos()
  }, [])

  const openNotification = (type, descripcion) => {
    notification[type]({
      description: descripcion
    });
  };

  const listarTiposDocumentos = async () => {
    validarPeticion(tiposDocumentosListar(token), (respuesta) => formatListTiposDocumentos(respuesta.datos))
  }

  const formatListTiposDocumentos = (datos) => {
    const list = datos.map(tipo_documento => {
      return {
        value: tipo_documento.id,
        label: tipo_documento.descripcion
      }
    })
    setTiposDocumentos(list)
  }

  const onSubmit = async paciente => {
    if (existe)
      validarPeticion(pacienteEditar(token, paciente), () => { }, true)
    else
      validarPeticion(pacienteCrear(token, paciente), () => { }, true)
  }

  return (
    <div className='row justify-content-center'>
      <Card title={titulo} className='col-md-6 col-sm-9 with-shadow'>
        <div className='row'>
          <Controller
            name="documento"
            control={control}
            render={({ field }) => <div className="mb-2 col-md-4">
              <label className="ant-form-item-label">Documento: </label>
              <Input
                {...field}
                disabled={existe}
              />
            </div>
            }
          />
          <Controller
            name="nombre"
            control={control}
            render={({ field }) => <div className="mb-2 col-md-4">
              <label className="ant-form-item-label">Nombre: </label>
              <Input
                {...field}
              />
            </div>
            }
          />
          <Controller
            name="descripcion"
            control={control}
            render={({ field }) => <div className="mb-2 col-md-4">
              <label className="ant-form-item-label">Descripción: </label>
              <Input
                {...field}
              />
            </div>
            }
          />
        </div>
        <div className='row'>

          <Controller
            name="tipo_documento_id"
            control={control}
            render={({ field }) => <div className="mb-2 col-md-4">
              <label className="ant-form-item-label">Tipo documento: </label>
              <Select
                {...field}
                options={tiposDocumentos}
              />
            </div>
            }
          />
          <Controller
            name="fecha_ingreso"
            control={control}
            render={({ field }) => <div className="mb-2 col-md-4">
              <label className="ant-form-item-label">Fecha de nacimiento: </label>
              <DateTimePicker
                {...field}
              />
            </div>
            }
          />
        </div>
        <div className="mt-4">
          <BotoneraFooterActions
            onClickCancelar={onClickCancelar}
            onClickAceptar={handleSubmit(onSubmit)}
          />
        </div>
      </Card>
    </div>
  )
}

export default withPageActions(PacientesEditar)(null)
