import apiService from '../apiService'
import ErroValidacao from "../exception/ErroValidacao";

export default class LancamentoService extends apiService {
    constructor() {
        super('/api/lancamentos');
    }

    obterListaMeses() {
        return [
            {label: 'SELECIONE...', value: ''},
            {label: 'JANEIRO', value: 1},
            {label: 'FEVEREIRO', value: 2},
            {label: 'MARÇO', value: 3},
            {label: 'ABRIL', value: 4},
            {label: 'MAIO', value: 5},
            {label: 'JUNHO', value: 6},
            {label: 'JULHO', value: 7},
            {label: 'AGOSTO', value: 8},
            {label: 'SETEMBRO', value: 9},
            {label: 'OUTUBRO', value: 10},
            {label: 'NOVEMBRO', value: 11},
            {label: 'DEZEMBRO', value: 12}
        ]
    }

    obterListaTipos() {
        return [
            {label: 'SELECIONE...', value: ''},
            {label: 'Despesa', value: 'DESPESA'},
            {label: 'Receita', value: 'RECEITA'}
        ]
    }

    obterListaStatus() {
        return [
            {label: 'SELECIONE...', value: ''},
            {label: 'Cancelado', value: 'CANCELADO'},
            {label: 'Efetivado', value: 'EFETIVADO'},
            {label: 'Pendente', value: 'PENDENTE'}
        ]
    }

    buscarLancamentos(lancamentoFiltro) {
        let params = `?ano=${lancamentoFiltro.ano}`
        if (lancamentoFiltro.mes) {
            params = `${params}&mes=${lancamentoFiltro.mes}`
        }
        if (lancamentoFiltro.tipo) {
            params = `${params}&tipo=${lancamentoFiltro.tipo}`
        }
        if (lancamentoFiltro.status) {
            params = `${params}&status=${lancamentoFiltro.status}`
        }
        if (lancamentoFiltro.usuario) {
            params = `${params}&usuario=${lancamentoFiltro.usuario}`
        }
        if (lancamentoFiltro.descricao) {
            params = `${params}&descricao=${lancamentoFiltro.descricao}`
        }
        return this.get(params)
    }

    deleteLancamento(idLancamento) {
        return this.delete(`/${idLancamento}`);
    }

    salvarLancamento(lancamento) {
        return this.post('/', lancamento);
    }

    atualizarLancamento(lancamento) {
        return this.put(`/${lancamento.id}`, lancamento);
    }

    obterLancamentoPorId(idLancamento) {
        return this.get(`/${idLancamento}`);
    }
    alterarStatusLancamento(idLancamento, status){
        return this.put(`/${idLancamento}/atualiza-status`, {status});
    }

    validarLancamento(lancamento) {
        const erros = [];
        if(!lancamento.ano){
            erros.push('Informe um ano Válido!');
        }
        if(!lancamento.mes){
            erros.push('Informe um mês Válido!')
        }
        if(!lancamento.descricao){
            erros.push('Informe uma Descrição!')
        }
        if(!lancamento.valor){
            erros.push('Informe um Valor!')
        }
        if(!lancamento.tipo){
            erros.push('Selecione um Tipo de Lançamento!')
        }
        if(erros && erros.length > 0) {
            throw new ErroValidacao(erros);
        }
    }
}