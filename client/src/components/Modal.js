import React from 'react';
import styled from 'styled-components';
import { ProductConsumer } from '../context';
import { ButtonContainer } from './button';
import { Link } from 'react-router-dom';

export default function Modal() {
    return (
        <ProductConsumer>
            {(value) => {
                const { modalOpen, closeModal } = value;
                const { selectedFile, title, price } = value.modalProduct;
                if (!modalOpen) {
                    return null;
                } else {
                    return (
                        <ModalContainer>
                            <div className="container">
                                <div className="row">
                                    <div id="modal" className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize py-5">
                                        <h5>Item added to cart</h5>
                                        <img src={selectedFile} className="img-fluid" alt="product" />
                                        <h5>{title}</h5>
                                        <h5 className="text-muted">Price : $ {price}</h5>
                                        <Link to="/">
                                            <ButtonContainer onClick={() => closeModal()}>
                                                store
                                        </ButtonContainer>
                                        </Link>
                                        <Link to="/cart">
                                            <ButtonContainer cart onClick={() => closeModal()}>
                                                go to cart
                                        </ButtonContainer>
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </ModalContainer>
                    )
                }
            }}
        </ProductConsumer>
    )
}

const ModalContainer = styled.div`
position:fixed;
top:0;
left:0;
right:0;
bottom:0;
background:rgba(0,0,0,0.3);
display:flex;
align-items:center;
justify-content:center;
#modal{
    background:var(--mainWhite);
}
`
