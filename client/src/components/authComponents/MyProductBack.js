import React from 'react';
import { AdminFront } from './AdminFront';
import { ProductConsumer } from '../../context';
import ProductBack from './ProductsBack';


export const MyProductBack = (props) => {
    return (
        <ProductConsumer>
            {(value) => {
                const mylogin = localStorage.getItem('login');
                const { products } = value;
                return (
                    mylogin ? (<ProductBack history={props.history} products={products} />) : (<AdminFront history={props.history} />)
                )
            }}

        </ProductConsumer>
    )
}