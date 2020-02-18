import React from 'react'
import currencyFormatter from 'currency-formatter'
import {DataTable} from 'primereact/datatable';

export default (props) => {

    const rows = props.lancamentos.map((lancamento, index) => {
        return (
            <tr key={index}>
                <th scope="row">{lancamento.descricao}</th>
                <td>{currencyFormatter.format(lancamento.valor, {locale: 'pt-BR'})}</td>
                <td>{lancamento.tipoLancamento}</td>
                <td>{lancamento.ano}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.statusLancamento}</td>
                <td>
                    <button
                        type="button"
                        className="btn btn-success"
                        title="Efetivar"
                        disabled={lancamento.statusLancamento === 'EFETIVADO'}
                        onClick={e => props.changeStatusAction(lancamento, 'EFETIVADO')}>
                        <i className="pi pi-check"></i>
                    </button>
                    <button
                        type="button"
                        className="btn btn-warning"
                        title="Cancelar"
                        disabled={lancamento.statusLancamento === 'CANCELADO'}
                        onClick={e => props.changeStatusAction(lancamento, 'CANCELADO')}>
                        <i className="pi pi-times"></i>
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        title="Editar"
                        onClick={e => props.editAction(lancamento.id)}>
                        <i className="pi pi-pencil"></i>
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        title="Apagar"
                        onClick={e => props.deleteAction(lancamento)}>
                        <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    })
    return (
        <table className="table table-hover">
            <thead>
            <tr>
                <th scope="col">Descrição</th>
                <th scope="col">Valor</th>
                <th scope="col">Tipo</th>
                <th scope="col">Ano</th>
                <th scope="col">Mês</th>
                <th scope="col">Situação</th>
                <th scope="col">Ações</th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
    )
}