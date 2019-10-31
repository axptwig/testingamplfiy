import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
        <Navbar color="faded" light={true} fixed="top" style={{backgroundColor:"#1F1B24"}}>
          <NavbarBrand href="/" className="mr-auto"style={{color: "white"}}>Unicornflix</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem >
                <NavLink href="/Login/" style={{color: "white"}}>Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Sign-up/" style={{color: "white"}}>Sign Up</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Admin/" style={{color: "white"}}>Admin</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/wizage/UnicornFlix" style={{color: "white"}}>GitHub</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
    );
  }
}