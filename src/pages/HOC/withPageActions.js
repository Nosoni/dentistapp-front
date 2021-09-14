import React from 'react'
import { notification } from 'antd';
import { setPageData, updatePageDada } from '../../redux/page-data/actions';
import { updateUsuarioData } from '../../redux/usuario-data/actions';
import { connect } from 'react-redux'

const withPageActions = (Component) => {
  function selectors(state) {
    const usuarioData = state.usuarioData
    const pageData = state.pageData
    return { usuarioData, pageData }
  }

  return (pageData) => connect((state) => selectors(state), { setPageData, updatePageDada, updateUsuarioData })
    (class extends React.Component {
      componentWillMount() {
        if (pageData) {
          this.props.setPageData(pageData)
        }
      }

      openNotification = (type, descripcion) => {
        notification[type]({
          description: descripcion,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      };

      validarPeticion = (respuesta, next, notificar) => {
        if (respuesta.error) {
          this.openNotification("error", respuesta.mensaje)
          if (respuesta.autenticado === false) {
            this.handleUpdateUsuarioData({ authenticated: false });
          }
        } else {
          next(respuesta)
          if (notificar) {
            this.openNotification("success", respuesta.mensaje)
          }
        }
      }

      handleUpdatePageData = (objeto) => {
        this.props.updatePageDada(objeto);
      }

      handleUpdateUsuarioData = (objeto) => {
        this.props.updateUsuarioData(objeto);
      }

      render() {
        return (
          <Component
            usuarioData={this.props.usuarioData}
            pageData={this.props.pageData}
            validarPeticion={this.validarPeticion}
            actualizarEstadoPagina={this.handleUpdatePageData}
            {...this.props} />
        )
      }
    })
}

export default withPageActions