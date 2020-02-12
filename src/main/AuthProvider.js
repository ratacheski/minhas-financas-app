import React from "react";
import AuthService from "../app/services/authService";

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;
const Provider = AuthContext.Provider;

class AuthProvider extends React.Component {
    state = {
        usuarioAutenticado: null,
        isUsuarioAutenticado: false
    };
    initSession = (user) => {
        AuthService.doLogin(user);
        this.setState({isUsuarioAutenticado: true, usuarioAutenticado: user});
    };
    endSession = () => {
        AuthService.logoutUsuario();
        this.setState({isUsuarioAutenticado: false, usuarioAutenticado: null});
    };

    render() {
        const context = {
            usuarioAutenticado: this.state.usuarioAutenticado,
            isUsuarioAutenticado: this.state.isUsuarioAutenticado,
            initSession: this.initSession,
            endSession: this.endSession
        };

        return (
            <Provider value={context}>
                {this.props.children}
            </Provider>
        )
    }
}

export default AuthProvider;