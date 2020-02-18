import React from 'react'
import { Card } from 'primereact/card';
import FormGroup from '../components/FormGroup'
import { withRouter } from 'react-router-dom'
import UsuarioService from '../app/services/usuarioService'
import { showErrorMessage } from '../components/Toastr'
import { AuthContext } from '../main/AuthProvider'

class Login extends React.Component {

    constructor() {
        super();
        this.service = new UsuarioService();
        this.state = {
            email: '',
            senha: ''
        }
    }

    componentDidMount() {
        document.body.style.backgroundImage = "url('/background.jpg')";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
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
            <div className="row h-100">
                <div className="col-md-6 mx-auto align-self-center">
                    <div className="bs-docs-section">
                        <Card className="login-panel">
                            <div className="row mx-auto">
                                <img className="mx-auto" src="logo192.png" alt="" />
                            </div>
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
                                                    onChange={e => this.setState({ email: e.target.value })} />
                                            </FormGroup>
                                            <FormGroup label="Senha" htmlFor="exampleInputPassword1">
                                                <input type="password" className="form-control"
                                                    id="exampleInputPassword1"
                                                    placeholder="Senha"
                                                    value={this.state.senha}
                                                    onChange={e => this.setState({ senha: e.target.value })} />
                                            </FormGroup>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <button onClick={this.entrar} className="btn mx-auto w-75 btn-login btn-success">
                                    <i className="pi pi-sign-in" /> Entrar
                                            </button>
                            </div>
                            <div className="row">
                                <button onClick={this.cadastrar} className="btn mx-auto w-75 btn-danger">
                                    <i className="pi pi-plus" /> Cadastrar
                                            </button>
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
