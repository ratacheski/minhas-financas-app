import LocalStorageService from "./localStorageService";

export const SESSION_USER = '_sessionUser';

export default class AuthService {
    static isUsuarioAutenticado(){
        const usuario = LocalStorageService.getItem(SESSION_USER);
        return usuario && usuario.id;
    }

    static logoutUsuario(){
        LocalStorageService.removeItem(SESSION_USER);
    }

    static doLogin(usuario){
        LocalStorageService.addItem(SESSION_USER, usuario);
    }

    static getUsuarioAutenticado(){
        return LocalStorageService.getItem(SESSION_USER);
    }
}