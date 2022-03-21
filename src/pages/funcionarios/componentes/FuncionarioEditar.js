import React, { useEffect, useState } from 'react'
import { Input, Button, Select, notification, Card, DatePicker } from 'antd';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { tiposDocumentosListar } from '../../../services/tipos_documentos';
import { useDispatch, useSelector } from 'react-redux';
import { funcionarioCrear, funcionarioEditar } from '../../../services/funcionarios';
import { updateUsuarioData } from '../../../redux/usuario-data/actions';
import { validarFecha } from '../../../utils/helpers';
import '../../components/css/datetimepicker.css';

const FuncionarioEditar = ({ onClickCancelar }) => {
  const dispatch = useDispatch();
  const { selected } = useSelector((state) => state.pageData);
  selected.fecha_ingreso = validarFecha(selected.fecha_ingreso)
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
      description: descripcion
    });
  };

  const validarPeticion = (respuesta, next) => {
    if (respuesta.error) {
      openNotification("error", respuesta.mensaje)
      if (respuesta.autenticado === false) {
        dispatch(updateUsuarioData({ authenticated: false }));
      }
    } else {
      next(respuesta)
    }
  }

  const listarTiposDocumentos = async () => {
    const respuesta = await tiposDocumentosListar(token)
    validarPeticion(respuesta, (respuesta) => formatListTiposDocumentos(respuesta.datos))
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

  const onSubmit = async funcionario => {
    let respuesta;
    if (existe)
      respuesta = await funcionarioEditar(token, funcionario)
    else
      respuesta = await funcionarioCrear(token, funcionario)

    validarPeticion(respuesta, (respuesta) => {
      openNotification((respuesta.error ? "error" : "success"), respuesta.mensaje)
    })
  }

  return (
    <div className='row justify-content-center'>
      <Card title={titulo} className='col-md-6 col-sm-9 with-shadow'>
        <div className='row mb-2'>
          <Controller
            name="documento"
            control={control}
            render={({ field }) => <div className="col-md-4">
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
            render={({ field }) => <div className="col-md-4">
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
            render={({ field }) => <div className="col-md-4">
              <label className="ant-form-item-label">Fecha de ingreso: </label>
              <DatePicker
                placeholder="Seleccione la fecha"
                format="DD/MM/YYYY"
                {...field}
              />
            </div>
            }
          />
        </div>
        <div className='row mb-2'>
          <Controller
            name="nombres"
            control={control}
            render={({ field }) => <div className="col-md-6">
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
            render={({ field }) => <div className="col-md-6">
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
            name="ciudad"
            control={control}
            render={({ field }) => <div className="col-md-6">
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
            render={({ field }) => <div className="col-md-6">
              <label className="ant-form-item-label">Dirección: </label>
              <Input
                {...field}
              />
            </div>
            }
          />
        </div>
        <div className='row'>
          <Controller
            name="telefono"
            control={control}
            render={({ field }) => <div className="col-md-6">
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
            render={({ field }) => <div className="col-md-6">
              <label className="ant-form-item-label">Email: </label>
              <Input
                {...field}
                type="email"
              />
            </div>
            }
          />
        </div>
        <div className='mt-4 modal-footer d-flex justify-content-between'>
          <Button className='bg-color-info' onClick={onClickCancelar}>
            Volver
          </Button>
          <Button className='bg-color-success' onClick={handleSubmit(onSubmit)}>
            Aceptar
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default FuncionarioEditar
//TODO add hocwithactions