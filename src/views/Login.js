import React from 'react'
import Card from '../components/Card'
import FormGroup from '../components/FormGroup'
import {withRouter} from 'react-router-dom'
import UsuarioService from '../app/services/usuarioService'
import {showErrorMessage} from '../components/Toastr'
import {AuthContext} from '../main/AuthProvider'

class Login extends React.Component {

    state = {
        email: '',
        senha: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            this.context.initSession(response.data);
            this.props.history.push('/home');
        }).catch(erro => {
            showErrorMessage(erro.response.data);
        })
    }

    cadastrar = () => {
        this.props.history.push('/cadastro-usuario');
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6" style={{position: 'relative', left: '300px'}}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email" htmlFor="exampleInputEmail1">
                                                <input type="email" className="form-control"
                                                       id="exampleInputEmail1"
                                                       aria-describedby="emailHelp"
                                                       placeholder="Digite o Email"
                                                       value={this.state.email}
                                                       onChange={e => this.setState({email: e.target.value})}/>
                                            </FormGroup>
                                            <FormGroup label="Senha" htmlFor="exampleInputPassword1">
                                                <input type="password" className="form-control"
                                                       id="exampleInputPassword1"
                                                       placeholder="Senha"
                                                       value={this.state.senha}
                                                       onChange={e => this.setState({senha: e.target.value})}/>
                                            </FormGroup>
                                            <button onClick={this.entrar} className="btn btn-success">
                                                <i className="pi pi-sign-in"/> Entrar
                                            </button>
                                            <button onClick={this.cadastrar} className="btn btn-danger">
                                                <i className="pi pi-plus"/> Cadastrar
                                            </button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

Login.contextType = AuthContext;
export default withRouter(Login);
