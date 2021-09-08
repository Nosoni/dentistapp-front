import React, { useEffect, useState } from 'react'
import { Input, Button, Select, notification, Card } from 'antd';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { tiposDocumentosListar } from '../../../services/tipos_documentos';
import { useDispatch, useSelector } from 'react-redux';
import { funcionarioCrear, funcionarioEditar } from '../../../services/usuarios';
import { updateUsuarioData } from '../../../redux/usuario-data/actions';

const UsuarioEditar = ({ selected, onClickCancelar }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.usuarioData.token);
  const [tiposDocumentos, setTiposDocumentos] = useState([])
  const existe = !!selected?.id
  let titulo = "Editar funcionario"
  const shape = {
    documento: yup.string().required("Favor introduzca el documento"),
    tipo_documento_id: yup.string().required("Favor seleccione el tipo de documento"),
    nombres: yup.string().required("Favor introduzca el nombre"),
    apellidos: yup.string().required("Favor introduzca el apellido"),
  }
  if (!existe) {
    titulo = "Crear funcionario"
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
      description: descripcion,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  const validarPeticion = (respuesta, next) => {
    if (respuesta.error) {
      openNotification("error", respuesta.mensaje)
      if (!respuesta.autenticado) {
        dispatch(updateUsuarioData({ authenticated: false }));
      }
    } else {
      next(respuesta)
    }
  }

  const listarTiposDocumentos = async () => {
    const respuesta = await tiposDocumentosListar(token)
    validarPeticion(respuesta, (respuesta) => setListTiposDocumentos(respuesta.datos))
  }

  const setListTiposDocumentos = (datos) => {
    const list = datos.map(tipo_documento => {
      return {
        value: tipo_documento.id,
        label: tipo_documento.descripcion
      }
    })
    setTiposDocumentos(list)
  }

  const onSubmit = async funcionario => {
    console.log(funcionario)
    let respuesta;
    // if (existe)
    //   respuesta = await usuarioEditar(token, usuario)
    // else
    //   respuesta = await usuarioCrear(token, usuario)

    // validarPeticion(respuesta, (respuesta) => {
    //   openNotification((respuesta.error ? "error" : "success"), respuesta.mensaje)
    // })
  }

  return (
    <div className='row justify-content-center'>
      <Card title={titulo} className='col-md-6 col-sm-9 with-shadow'>
        <div className='row'>
          <Controller
            name="documento"
            control={control}
            render={({ field }) => <div className="mb-2 col-md-6">
              <label className="ant-form-item-label">Documento: </label>
              <Input
                {...field}
                disabled={existe}
              />
            </div>
            }
          />
          <Controller
            name="tipo_documento_id"
            control={control}
            render={({ field }) => <div className="mb-2 col-md-6">
              <label className="ant-form-item-label">Tipo documento: </label>
              <Select
                {...field}
                options={tiposDocumentos}
              />
            </div>
            }
          />
        </div>
        <Controller
          name="nombres"
          control={control}
          render={({ field }) => <div className="mb-2">
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
          render={({ field }) => <div className="mb-2">
            <label className="ant-form-item-label">Apellidos: </label>
            <Input
              {...field}
            />
          </div>
          }
        />
        <div className='mt-4 modal-footer d-flex justify-content-between'>
          <Button className='bg-color-info' onClick={onClickCancelar}>
            Cancelar
          </Button>
          <Button className='bg-color-success' onClick={handleSubmit(onSubmit)}>
            Aceptar
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default UsuarioEditar
