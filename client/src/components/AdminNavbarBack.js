import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import styled from 'styled-components';
import { ProductConsumer } from '../context';
import { useHistory } from 'react-router-dom';
import { ButtonContainer, LogoutButtonContainer } from './button';

export default function AdminNavbarBacK() {
    const history = useHistory();
    return (
        <ProductConsumer>
            {value => {
                const { logout } = value;
                return (
                    <NavWrapper className="navbar navbar-expand-sm bg-primary navbar-dark px-sm-5">
                        {/*
                    https://www.iconfinder.com/icons/1243689/call_phone_icon 
                    Creative Commons (Attribution 3.0 Unported);
                    https://www.iconfinder.com/Makoto_msk
                */}
                        <Link to="/">
                            <img src={logo} alt="store" className="navbar-brand" />
                        </Link>
                        <ul className="navbar-nav align-items-center">
                            <li className="nav-items ml-5">
                                <Link to="/" className="nav-link">
                                    Products
                                </Link>
                            </li>
                        </ul>
                        <Link to="/admin/allProducts" className="ml-auto">
                            <ButtonContainer>
                                <span className="mr-2">
                                    Get Product
                                </span>
                            </ButtonContainer>
                        </Link>

                        <LogoutButtonContainer onClick={() => { logout(); history.push('/') }}>
                            <span className="mr-2">
                                logout
                                </span>
                        </LogoutButtonContainer>

                    </NavWrapper>
                )
            }
            }
        </ProductConsumer >
    )

}


const NavWrapper = styled.nav`
 background: var(--mainBlue) !important;
 .nav-link{
     color:var(--mainWhite)!important;
     font-size:1.3rem;
     text-transform:capitalize;
 }
`