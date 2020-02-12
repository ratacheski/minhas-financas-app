import React from 'react'

import Card from '../components/Card'
import FormGroup from '../components/FormGroup'
import UsuarioService from '../app/services/usuarioService'
import {withRouter} from 'react-router-dom'
import {showSuccessMessage, showErrorMessage} from '../components/Toastr'

class CadastroUsuario extends React.Component {
    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    cadastrar = () => {
        const {nome, email, senha, senhaRepeticao} = this.state;
        const usuario = {nome, email, senha, senhaRepeticao};
        try {
            this.service.validarUsuario(usuario);
        } catch (erro) {
            const messages = erro.messages;
            messages.forEach(message => {
                showErrorMessage(message);
            });
            return false;
        }

        this.service.cadastrarUsuario(usuario)
            .then(response => {
                showSuccessMessage('Usuário Cadastrado Com Sucesso! Faça o Login para acessar o sistema.');
                this.props.history.push('/login');
            })
            .catch(erro => {
                showErrorMessage(erro.response.data);
            });
    }

    cancelar = () => {
        this.props.history.push('/login');
    }

    render() {
        return (
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text" id="inputNome" name="nome"
                                       className="form-control"
                                       onChange={e => this.setState({nome: e.target.value})}/>
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="text" id="inputEmail" name="email"
                                       className="form-control"
                                       onChange={e => this.setState({email: e.target.value})}/>
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password" id="inputSenha" name="senha"
                                       className="form-control"
                                       onChange={e => this.setState({senha: e.target.value})}/>
                            </FormGroup>
                            <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                <input type="password" id="inputRepitaSenha" name="senhaRepeticao"
                                       className="form-control"
                                       onChange={e => this.setState({senhaRepeticao: e.target.value})}/>
                            </FormGroup>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="float-right">
                            <button type="button" className="btn btn-success" onClick={this.cadastrar}>
                                <i className="pi pi-save"/> Salvar</button>
                            <button type="button" className="btn btn-danger" onClick={this.cancelar}>
                                <i className="pi pi-times"/> Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroUsuario);