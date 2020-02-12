import apiService from '../apiService';
import ErroValidacao from "../exception/ErroValidacao";

class UsuarioService extends apiService{

    constructor (){
        super('/api/usuarios');
    }

    autenticar(credentials){
        return this.post('/autenticar', credentials);
    }

    obterSaldoUsuario(idUsuario){
        return this.get(`/${idUsuario}/saldo`);
    }

    cadastrarUsuario(usuario){
        return this.post('/', usuario);
    }

    validarUsuario(usuario){

        const erros = []

        if (!usuario.nome) {
            erros.push('Campo Nome é Obrigatório!');
        }
        if (!usuario.email){
            erros.push('Campo Email é Obrigatório!');
        } else if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            erros.push('Email Digitado é Inválido!');
        }
        if(!usuario.senha || !usuario.senhaRepeticao){
            erros.push('Digite e Confirme a Senha!');
        } else if (usuario.senha !== usuario.senhaRepeticao){
            erros.push('Senhas Digitadas não são Iguais!');
        }
        if (erros && erros.length > 0 ){
            throw new ErroValidacao(erros);
        }
    }
}

export default UsuarioService;