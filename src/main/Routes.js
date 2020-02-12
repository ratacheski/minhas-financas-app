import React from 'react'

import {Route, Switch, HashRouter, Redirect} from 'react-router-dom'

import Login from '../views/Login'
import Home from '../views/Home'
import CadastroUsuario from '../views/CadastroUsuario'
import ConsultaLancamentos from '../views/lancamentos/ConsultaLancamentos'
import CadastroLancamento from "../views/lancamentos/CadastroLancamento";
import {AuthConsumer} from "./AuthProvider";


function RotaAutenticada({component: Component, isUsuarioAutenticado, ...props}) {
    return (
        <Route {...props} render={(componentProps) => {
            if (isUsuarioAutenticado) {
                return (
                    <Component {...componentProps}/>
                )
            } else {
                return (
                    <Redirect to={{pathname: '/login', state: {from: componentProps.location}}}/>
                )
            }
        }}/>
    )
}

function RotaRaiz({...props}) {
    return (
        <Route {...props} render={(componentProps) => {
            return (
                <Redirect to={{pathname: '/login', state: {from: componentProps.location}}}/>
            )
        }}/>
    )
}

function Routes(props) {
    return (
        <HashRouter>
            <Switch>
                <RotaRaiz path="/"/>
                <Route path="/login" component={Login}/>
                <Route path="/cadastro-usuario" component={CadastroUsuario}/>
                <RotaAutenticada path="/home" isUsuarioAutenticado={props.isUsuarioAutenticado} component={Home}/>
                <RotaAutenticada path="/consulta-lancamentos" isUsuarioAutenticado={props.isUsuarioAutenticado}
                                 component={ConsultaLancamentos}/>
                <RotaAutenticada path="/cadastro-lancamento/:idLancamento?"
                                 isUsuarioAutenticado={props.isUsuarioAutenticado}
                                 component={CadastroLancamento}/>
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        {(context) => (
            <Routes isUsuarioAutenticado={context.isUsuarioAutenticado}/>
        )}
    </AuthConsumer>
);