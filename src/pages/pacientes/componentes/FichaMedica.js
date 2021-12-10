import React from 'react'
import { Input, Checkbox } from 'antd';
import { useForm, Controller } from "react-hook-form";
import BotoneraFooterActions from '../../components/BotoneraFooterActions';

const FichaMedica = ({ onSubmit, ...props }) => {
  const { onClickCancelar, validarPeticion,
    pageData: { selected }, usuarioData: { token } } = props

  const { control, handleSubmit } = useForm({
    defaultValues: selected.ficha_medica,
  });

  return <>
    <div className='row'>
      <Controller
        name="otro_medico"
        control={control}
        render={({ field }) => <Checkbox className="col-md-6"
          checked={field.value}
          {...field}
        >
          ¿Está siendo atendido por otro médico?
        </Checkbox>
        }
      />
      <Controller
        name="otro_medico_observacion"
        control={control}
        render={({ field }) => <div className="col-md-6">
          <label>En caso de ser atendido por otro médico. Escriba el nombre, contacto y especialiad del médico</label>
          <Input
            {...field}
          />
        </div>
        }
      />
    </div>
    <div className='row'>
      <Controller
        name="medicamento"
        control={control}
        render={({ field }) => <Checkbox className="col-md-6"
          checked={field.value}
          {...field}
        >
          ¿Está tomando algún medicamento?
        </Checkbox>
        }
      />
      <Controller
        name="medicamento_json"
        control={control}
        render={({ field }) => <label className="col-md-6"><strong></strong></label>
        }
      />
    </div>
    <div className='row'>
      <Controller
        name="psiquiatra"
        control={control}
        render={({ field }) => <Checkbox className="col-md-6"
          checked={field.value}
          {...field}
        >
          ¿Está siendo atendido por un médico psiquiatra?
        </Checkbox>
        }
      />
      <Controller
        name="alergia"
        control={control}
        render={({ field }) => <Checkbox className="col-md-6"
          checked={field.value}
          {...field}
        >
          ¿Padece alergia a algún medicamento o antibiótico?
        </Checkbox>
        }
      />
    </div>
    <div className='row'>
      <Controller
        name="reaccion_anestesia"
        control={control}
        render={({ field }) => <Checkbox className="col-md-6"
          checked={field.value}
          {...field}
        >
          ¿Ha tenido alguna reacción con la anestesia local?
        </Checkbox>
        }
      />
      <Controller
        name="diabetico"
        control={control}
        render={({ field }) => <Checkbox className="col-md-6"
          checked={field.value}
          {...field}
        >
          ¿Es diabético?
        </Checkbox>
        }
      />
    </div>
    <div className='row'>
      <Controller
        name="trastornos_convulsivo"
        control={control}
        render={({ field }) => <Checkbox className="col-md-6"
          checked={field.value}
          {...field}
        >
          ¿Tiene trastornos de tipo convulsivo?
        </Checkbox>
        }
      />
      <Controller
        name="hepatitis"
        control={control}
        render={({ field }) => <Checkbox className="col-md-6"
          checked={field.value}
          {...field}
        >
          ¿Padece o padeció hepatitis?
        </Checkbox>
        }
      />
    </div>
    <div className='row'>
      <Controller
        name="enfermedad_renal"
        control={control}
        render={({ field }) => <Checkbox className="col-md-6"
          checked={field.value}
          {...field}
        >
          ¿Padece o padeció alguna enfermedad renal?
        </Checkbox>
        }
      />
      <Controller
        name="problema_cardiaco"
        control={control}
        render={({ field }) => <Checkbox className="col-md-6"
          checked={field.value}
          {...field}
        >
          ¿Tienes problemas del corazón?
        </Checkbox>
        }
      />
    </div>
    <div className='row'>
      <Controller
        name="cancer"
        control={control}
        render={({ field }) => <Checkbox className="col-md-6"
          checked={field.value}
          {...field}
        >
          ¿Padece o ha padecido cáncer?
        </Checkbox>
        }
      />
      <Controller
        name="intervencion_quirurgica"
        control={control}
        render={({ field }) => <Checkbox className="col-md-6"
          checked={field.value}
          {...field}
        >
          ¿Lo han intervenido quirúrgicamente?
        </Checkbox>
        }
      />
    </div>
    <div className='row'>
      <Controller
        name="hospitalizado"
        control={control}
        render={({ field }) => <Checkbox className="col-md-6"
          checked={field.value}
          {...field}
        >
          ¿Lo han hospitalizado?
        </Checkbox>
        }
      />
      <Controller
        name="sangrado_excesivo"
        control={control}
        render={({ field }) => <Checkbox className="col-md-6"
          checked={field.value}
          {...field}
        >
          ¿Ha tenido algún sangrado excesivo?
        </Checkbox>
        }
      />
    </div>
    <div className='row'>
      <Controller
        name="hipertension"
        control={control}
        render={({ field }) => <Checkbox className="col-md-6"
          checked={field.value}
          {...field}
        >
          ¿Padece de hipertensión?
        </Checkbox>
        }
      />
      <Controller
        name="transfusion_sangre"
        control={control}
        render={({ field }) => <Checkbox className="col-md-6"
          checked={field.value}
          {...field}
        >
          ¿Le ha transfundido sangre?
        </Checkbox>
        }
      />
    </div>
    <div className='row'>
      <Controller
        name="problema_digestivo"
        control={control}
        render={({ field }) => <Checkbox className="col-md-6"
          checked={field.value}
          {...field}
        >
          ¿Tiene algún problema digestivo (úlcera, gastritis)?
        </Checkbox>
        }
      />
    </div>
    <div className='row'>
      <div className='col-md-6' style={{ display: 'flex', flexDirection: 'column' }}>
        <Controller
          name="otra_enfermedad_trastorno"
          control={control}
          render={({ field }) => <Checkbox
            checked={field.value}
            {...field}
          >
            ¿Padece alguna otra enfermedad o trastorno que no se menciona en esta lista y que debamos saber?
          </Checkbox>
          }
        />
        <Controller
          name="otra_enfermedad_trastornos_observacion"
          control={control}
          render={({ field }) => <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <label className="mr-2">Indique cuál:</label>
            <Input
              {...field}
            />
          </div>
          }
        />
      </div>
      <div className='col-md-6' style={{ display: 'flex', flexDirection: 'column' }}>
        <label className='mt-2'><strong>En caso de ser mujer</strong></label>
        <Controller
          name="embarazada"
          control={control}
          render={({ field }) => <Checkbox className="ml-4"
            checked={field.value}
            {...field}
          >
            ¿Está embarazada?
          </Checkbox>
          }
        />
        <Controller
          name="anticonceptivos_orales"
          control={control}
          render={({ field }) => <Checkbox className="ml-4"
            checked={field.value}
            {...field}
          >
            ¿Toma anticonceptivos orales?
          </Checkbox>
          }
        />
        <Controller
          name="trastornos_periodo"
          control={control}
          render={({ field }) => <Checkbox className="ml-4"
            checked={field.value}
            {...field}
          >
            ¿Tiene trastornos con su periodo mestrual?
          </Checkbox>
          }
        />
      </div>
    </div>
    <BotoneraFooterActions
      onClickCancelar={onClickCancelar}
      onClickAceptar={handleSubmit((data) => {
        onSubmit({ ...selected, ficha_medica: data })
      })}
    />
  </>
}

export default FichaMedica