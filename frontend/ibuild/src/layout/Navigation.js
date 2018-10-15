import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">IBuild</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="navbar-expand-lg navbar-light bg-light" navbar>
                            <NavItem>
                                <NavLink href="/register/product/">Adicionar Produto</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/register/store/">Adicionar Loja</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/products/">Listar Produtos</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/register/user/">Adicionar Usuarios</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
