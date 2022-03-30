import React, { useEffect, useState } from 'react'
import { Card } from 'antd';
import { useForm } from "react-hook-form";
import BotoneraFooterActions from '../../components/BotoneraFooterActions';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { tiposDocumentosListar } from '../../../services/tipos_documentos';
import '../../components/css/datetimepicker.css';
import { clienteCrear, clienteEditar } from '../../../services/clientes';
import InputText from '../../components/InputText';
import Selector from '../../components/Selector';

const ClienteEditar = (props) => {
  const { onClickCancelar, validarPeticion, openNotification,
    pageData: { selected }, usuarioData: { token } } = props
  const [tiposDocumentos, setTiposDocumentos] = useState([])
  const existe = !!selected?.id
  let titulo = "Editar cliente"
  if (!existe) {
    titulo = "Crear cliente"
  }
  const shape = {
    documento: yup.string().required("Favor introduzca el documento"),
    tipo_documento_id: yup.number().required("Favor seleccione el tipo documento"),
    nombres: yup.string().required("Favor introduzca el nombre"),
    apellidos: yup.string().required("Favor introduzca el apellido"),
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

  const onSubmit = async (cliente) => {
    console.log(cliente)
    if (existe)
      validarPeticion(clienteEditar(token, cliente), () => { }, true)
    else
      validarPeticion(clienteCrear(token, cliente), () => { }, true)
  }

  return <div className='row justify-content-center'>
    <Card title={titulo} className='with-shadow col-md-12'>
      <div className='row mb-2'>
        <div className="col-md-3">
          <InputText
            name='documento'
            control={control}
            label='Documento:'
            disabled={existe}
          />
        </div>
        <div className="col-md-4">
          <InputText
            name="nombres"
            control={control}
            label='Nombres:'
          />
        </div>
        <div className="col-md-4">
          <InputText
            name="apellidos"
            control={control}
            label='Apellidos:'
          />
        </div>
      </div>
      <div className='row mb-2'>
        <div className="col-md-3">
          <Selector
            name="tipo_documento_id"
            control={control}
            label='Tipo documento:'
            opciones={tiposDocumentos}
          />
        </div>
        <div className="col-md-3">
          <InputText
            name="telefono"
            control={control}
            label='Teléfono:'
          />
        </div>
        <div className="col-md-3">
          <InputText
            name="email"
            control={control}
            label='Email:'
          />
        </div>
      </div>
      <div className='row mb-2'>
        <div className="col-md-4">
          <InputText
            name="ciudad"
            control={control}
            label='Ciudad:'
          />
        </div>
        <div className="col-md-5">
          <InputText
            name="direccion"
            control={control}
            label='Dirección:'
          />
        </div>
      </div>
      <BotoneraFooterActions
        onClickCancelar={onClickCancelar}
        onClickAceptar={handleSubmit(onSubmit)}
      />
    </Card>
  </div>
}

export default ClienteEditar
