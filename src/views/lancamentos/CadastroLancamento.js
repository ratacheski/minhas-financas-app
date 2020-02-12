import React from "react";
import {withRouter} from 'react-router-dom';

import FormGroup from "../../components/FormGroup";
import SelectMenu from "../../components/SelectMenu";
import Card from '../../components/Card';
import LocalStorageService from "../../app/services/localStorageService";
import {showErrorMessage, showSuccessMessage} from '../../components/Toastr'
import LancamentoService from "../../app/services/lancamentoService";

class CadastroLancamento extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        isUpdating: false
    };

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    componentDidMount() {
        const params = this.props.match.params;
        console.log(params.idLancamento)
        if (params.idLancamento) {
            this.service.obterLancamentoPorId(params.idLancamento)
                .then(response => {
                    this.setState({...response.data, isUpdating: true})
                }).catch(error => {
                showErrorMessage(error.response.data);
            })
        }
    }

    submit = () => {
        const {descricao, valor, mes, ano, tipo} = this.state;
        const usuario = LocalStorageService.getItem('_sessionUser');
        const lancamento = {
            usuario: usuario.id,
            descricao,
            valor,
            mes,
            ano,
            tipo,
        };
        try {
            this.service.validarLancamento(lancamento)
        } catch (erro) {
            const messages = erro.messages;
            messages.forEach(message => {
                showErrorMessage(message)
            });
            return false;
        }


        this.service.salvarLancamento(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos');
                showSuccessMessage('Lançamento Cadastrado com Sucesso!');
            })
            .catch(error => {
                showErrorMessage(error.response.data);
            })
    };

    atualizar = () => {
        const {descricao, valor, mes, ano, tipo, id, usuario, status} = this.state;
        const lancamento = {
            id,
            usuario,
            descricao,
            valor,
            mes,
            ano,
            tipo,
            status
        };

        this.service.atualizarLancamento(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos');
                showSuccessMessage('Lançamento Atualizado com Sucesso!');
            })
            .catch(error => {
                showErrorMessage(error.response.data);
            })
    };

    handleChanged = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({[name]: value})
    };

    render() {
        const tiposLancamentoList = this.service.obterListaTipos();
        const mesesList = this.service.obterListaMeses();

        return (
            <Card title={this.state.isUpdating ? 'Edição de Lançamento' : 'Cadastro de Lançamento'}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input id="inputDescricao"
                                   type="text"
                                   className="form-control"
                                   name="descricao"
                                   value={this.state.descricao}
                                   onChange={this.handleChanged}/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno"
                                   type="text"
                                   className="form-control"
                                   name="ano"
                                   value={this.state.ano}
                                   onChange={this.handleChanged}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes"
                                        className="form-control"
                                        name="mes"
                                        list={mesesList}
                                        value={this.state.mes}
                                        onChange={this.handleChanged}/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor"
                                   type="text"
                                   className="form-control"
                                   name="valor"
                                   value={this.state.valor}
                                   onChange={this.handleChanged}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo de Lançamento: *">
                            <SelectMenu id="inputTipo"
                                        className="form-control"
                                        name="tipo"
                                        value={this.state.tipo}
                                        onChange={this.handleChanged}
                                        list={tiposLancamentoList}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status do Lançamento:">
                            <input type="text"
                                   className="form-control"
                                   name="status"
                                   value={this.state.status}
                                   disabled/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="float-right">
                            {this.state.isUpdating ?
                                (
                                    <button className="btn btn-success" onClick={this.atualizar}>
                                        <i className="pi pi-refresh"/> Atualizar</button>
                                ) : (
                                    <button className="btn btn-success" onClick={this.submit}>
                                        <i className="pi pi-save"/> Salvar</button>
                                )
                            }
                            <button className="btn btn-danger" onClick={e =>
                                this.props.history.push('/consulta-lancamentos')}>
                                <i className="pi pi-times"/> Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamento);