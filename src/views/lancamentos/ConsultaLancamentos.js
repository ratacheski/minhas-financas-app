import React from 'react'
import {withRouter} from 'react-router-dom'
import {Card} from 'primereact/card';
import FormGroup from '../../components/FormGroup'
import SelectMenu from '../../components/SelectMenu'
import LancamentosTable from './LancamentosTable'
import LancamentoService from '../../app/services/lancamentoService'
import LocalStorageService from '../../app/services/localStorageService'
import {showErrorMessage, showInfoMessage, showSuccessMessage} from '../../components/Toastr'
import {Dialog} from 'primereact/dialog'
import {Button} from "primereact/button";


class ConsultaLancamentos extends React.Component {

    state = {
        descricao: '',
        ano: '',
        mes: '',
        tipo: '',
        status: '',
        lancamentos: [],
        showConfirmDialog: false,
        lancamentoToDelete: {},
        msgDeleteLancamento: ''
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    buscar = () => {
        if (!this.state.ano) {
            showErrorMessage('O preenchimento do Ano é Obrigatório!');
            return false;
        }
        const usuario = LocalStorageService.getItem('_sessionUser');
        const lancamentoFiltro = {
            descricao: this.state.descricao,
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            status: this.state.status,
            usuario: usuario.id
        }

        this.service.buscarLancamentos(lancamentoFiltro)
            .then(response => {
                this.setState({lancamentos: response.data})
                if (this.state.lancamentos.length === 0) {
                    showInfoMessage('Não Existem Lançamentos para os dados buscados!')
                }
            })
            .catch(erro => {
                console.log(erro.response);
            });
    };

    editarLancamento = (idLancamento) => {
        this.props.history.push(`/cadastro-lancamento/${idLancamento}`);
    };

    confirmarRemocaoLancamento = (lancamento) => {
        this.setState({
            msgDeleteLancamento: `Deseja realmente remover o lançamento ${lancamento.descricao}`,
            lancamentoToDelete: lancamento,
            showConfirmDialog: true
        });
    };

    cancelarDeleteLancamento = (lancamento) => {
        this.setState({lancamentoToDelete: {}});
        this.setState({showConfirmDialog: false});
    };

    removerLancamento = () => {
        this.service.deleteLancamento(this.state.lancamentoToDelete.id)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                let indexOf = this.state.lancamentos.indexOf(this.state.lancamentoToDelete);
                lancamentos.splice(indexOf, 1);
                this.setState({lancamentos: lancamentos, showConfirmDialog: false});
                showSuccessMessage('Lançamento apagado com sucesso');
            }).catch(erro => {
            showErrorMessage('Erro ao apagar Lançamento');
        })
    };

    preparaFormularioCadastro = () => {
        this.props.history.push('/cadastro-lancamento');
    }

    alterarStatus = (lancamento, status) => {
        this.service
            .alterarStatusLancamento(lancamento.id, status)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento);
                if (index !== -1) {
                    console.log('ENTROU')
                    lancamento['statusLancamento'] = status;
                    lancamentos[index] = lancamento;
                    console.log(lancamentos[index]);
                    this.setState({lancamento});
                }
                showSuccessMessage(`Lançamento ${this.capitalizeFirstLetter(status)} com Sucesso!`);
            })
    };

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    render() {
        const listMeses = this.service.obterListaMeses();

        const listTiposLancamento = this.service.obterListaTipos();

        const listStatusLancamento = this.service.obterListaStatus();

        const confirmDialogFooter = (
            <div>
                <Button label="Sim" icon="pi pi-check" onClick={this.removerLancamento}/>
                <Button label="Não" icon="pi pi-times" onClick={this.cancelarDeleteLancamento}
                        className="p-button-secondary"/>
            </div>
        );

        return (
            <Card title="Consulta de Lançamentos">
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <FormGroup label="Descrição" htmlFor="inputDescricao">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputDescricao"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({descricao: e.target.value})}
                                    placeholder="Digite uma Descrição"/>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <FormGroup label="Ano *" htmlFor="inputAno">
                            <input
                                type="text"
                                className="form-control"
                                id="inputAno"
                                value={this.state.ano}
                                onChange={e => this.setState({ano: e.target.value})}
                                placeholder="Digite o Ano (Obrigatório)"/>
                        </FormGroup>
                        <FormGroup label="Tipo de Lançamento: " htmlFor="inputTipo">
                            <SelectMenu
                                id="inputTipo"
                                className="form-control"
                                list={listTiposLancamento}
                                value={this.state.tipo}
                                onChange={e => this.setState({tipo: e.target.value})}
                            />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup label="Mês" htmlFor="inputMes">
                            <SelectMenu
                                id="inputMes"
                                className="form-control"
                                list={listMeses}
                                value={this.state.mes}
                                onChange={e => this.setState({mes: e.target.value})}
                            />
                        </FormGroup>
                        <FormGroup label="Status do Lançamento: " htmlFor="inputStatus">
                            <SelectMenu
                                id="inputStatus"
                                className="form-control"
                                list={listStatusLancamento}
                                value={this.state.status}
                                onChange={e => this.setState({status: e.target.value})}
                            />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="float-right">
                            <button type="button" onClick={this.buscar} className="btn btn-success">
                                <i className="pi pi-search"/> Buscar
                            </button>
                            <button type="button" className="btn btn-danger"
                                    onClick={this.preparaFormularioCadastro}>
                                <i className="pi pi-plus"/> Cadastrar
                            </button>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable
                                lancamentos={this.state.lancamentos}
                                deleteAction={this.confirmarRemocaoLancamento}
                                editAction={this.editarLancamento}
                                changeStatusAction={this.alterarStatus}/>
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Atenção" visible={this.state.showConfirmDialog} style={{width: '50vw'}} modal={true}
                            footer={confirmDialogFooter}
                            onHide={() => this.setState({showConfirmDialog: false})}>
                        {this.state.msgDeleteLancamento}
                    </Dialog>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos);