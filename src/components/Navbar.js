import React from 'react'
import NavbarItem from './NavbarItem'
import {AuthContext} from "../main/AuthProvider";


class Navbar extends React.Component {

    render() {
        if (this.context.isUsuarioAutenticado) {
            return (
                <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
                    <div className="container">
                        <a href="home.html" className="navbar-brand">Minhas Finanças</a>
                        <button className="navbar-toggler"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarResponsive"
                                aria-controls="navbarResponsive"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav">
                                <NavbarItem link="#/home" label="Home"/>
                                <NavbarItem link="#/cadastro-usuario" label="Usuários"/>
                                <NavbarItem link="#/consulta-lancamentos" label="Lançamento"/>
                                <NavbarItem link="#/login" onClick={this.context.endSession} label="Sair"/>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        } else {
            return false;
        }
    }
}

Navbar.contextType = AuthContext;
export default Navbar;