import React from 'react'
import { AuthContext } from "../main/AuthProvider";
import { Menu } from 'primereact/menu';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';



class Navbar extends React.Component {

    constructor() {
        super();
        this.state = {
            items: [
                {
                    label: 'Home',
                    icon: 'pi pi-fw pi-home',
                    command: () => { this.handleMenuClick("/home"); }
                },
                {
                    label: 'Usuários',
                    icon: 'pi pi-fw pi-users',
                    command: () => { this.handleMenuClick("/cadastro-usuario"); }
                },
                {
                    label: 'Lançamentos',
                    icon: 'pi pi-fw pi-money-bill',
                    command: () => { this.handleMenuClick("/consulta-lancamentos"); }
                },
                {
                    label: 'Sair',
                    icon: 'pi pi-fw pi-sign-out',
                    command: () => { this.handleLogoutClick(); }
                },
            ],
            visible: false
        };
    }

    handleMenuClick = (location) => {
        window.location.hash = location;
        this.setState({ visible: false });
    };

    handleLogoutClick = (e) => {
        this.setState({ visible: false });
        this.context.endSession();
        window.location.hash = "/login";
    }

    render() {
        if (this.context.isUsuarioAutenticado) {
            return (
                <div className="content-section implementation">
                    <Sidebar visible={this.state.visible} baseZIndex={1000000} onHide={(e) => this.setState({ visible: false })}>
                        <img src="/favicon.ico" alt="" />
                        <br />
                        <br />
                        <Menu style={{ width: '100%' }} model={this.state.items} />
                    </Sidebar>
                    <Button icon="pi pi-bars" onClick={(e) => this.setState({ visible: true })} style={{ marginRight: '.25em' }} />
                </div>
            )
        } else {
            return false;
        }
    }
}

Navbar.contextType = AuthContext;
export default Navbar;