import React, { useEffect, useState } from 'react'
import withPageActions from '../../HOC/withPageActions'
import { Card, DatePicker, Input, notification, Select, Tabs } from 'antd';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { pacienteCrear, pacienteEditar } from '../../../services/pacientes';
import { tiposDocumentosListar } from '../../../services/tipos_documentos';
import BotoneraFooterActions from '../../components/BotoneraFooterActions';
import FichaMedica from './FichaMedica';
import { validarFecha } from '../../../utils/helpers';
import '../../components/css/datetimepicker.css';

const PacienteEditar = (props) => {
  const { onClickCancelar, validarPeticion } = props
  const { token } = props.usuarioData;
  const { selected } = props.pageData;
  selected.fecha_nacimiento = validarFecha(selected.fecha_nacimiento)
  const { TabPane } = Tabs;
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
    resolver: yupResolver(schema),
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
      <Card title={titulo} className='with-shadow col-md-9'>
        <Tabs defaultActiveKey={1}>
          <TabPane tab="Datos básicos" key={1}>
            <div className='row mb-2'>
              <Controller
                name="documento"
                control={control}
                render={({ field }) => <div className="col-md-3">
                  <label className="ant-form-item-label">Documento: </label>
                  <Input
                    {...field}
                    disabled={existe}
                  />
                </div>
                }
              />
              <Controller
                name="nombres"
                control={control}
                render={({ field }) => <div className="col-md-4">
                  <label className="ant-form-item-label">Nombres: </label>
                  <Input
                    {...field}
                  />
                </div>
                }
              />
              <Controller
                name="apellidos"
                control={control}
                render={({ field }) => <div className="col-md-4">
                  <label className="ant-form-item-label">Apellidos: </label>
                  <Input
                    {...field}
                  />
                </div>
                }
              />
            </div>
            <div className='row mb-2'>
              <Controller
                name="tipo_documento_id"
                control={control}
                render={({ field }) => <div className="col-md-3">
                  <label className="ant-form-item-label">Tipo documento: </label>
                  <Select
                    {...field}
                    options={tiposDocumentos}
                  />
                </div>
                }
              />
              <Controller
                name="fecha_nacimiento"
                control={control}
                render={({ field }) => <div className="col-md-3">
                  <label className="ant-form-item-label">Fecha de nacimiento: </label>
                  <DatePicker
                    placeholder="Seleccione la fecha"
                    format="DD/MM/YYYY"
                    {...field}
                  />
                </div>
                }
              />
              <Controller
                name="telefono"
                control={control}
                render={({ field }) => <div className="col-md-3">
                  <label className="ant-form-item-label">Teléfono: </label>
                  <Input
                    {...field}
                  />
                </div>
                }
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => <div className="col-md-3">
                  <label className="ant-form-item-label">Email: </label>
                  <Input
                    {...field}
                  />
                </div>
                }
              />
            </div>
            <div className='row mb-2'>
              <Controller
                name="ciudad"
                control={control}
                render={({ field }) => <div className="col-md-4">
                  <label className="ant-form-item-label">Ciudad: </label>
                  <Input
                    {...field}
                  />
                </div>
                }
              />
              <Controller
                name="direccion"
                control={control}
                render={({ field }) => <div className="col-md-5">
                  <label className="ant-form-item-label">Dirección: </label>
                  <Input
                    {...field}
                  />
                </div>
                }
              />
            </div>
            <BotoneraFooterActions
              onClickCancelar={onClickCancelar}
              onClickAceptar={handleSubmit(onSubmit)}
            />
          </TabPane>
          {
            existe &&
            <TabPane tab="Ficha médica" key={2}>
              <FichaMedica ficha={selected.ficha_medica} {...props} />
            </TabPane>
          }
        </Tabs>
      </Card>
    </div>
  )
}

export default withPageActions(PacienteEditar)(null)
