import React from 'react';
import { AdminFront } from './AdminFront';
import { ProductConsumer } from '../../context';
import { EditProduct } from './Edit';


export const EditSwitch = (props) => {
    return (
        <ProductConsumer>
            {(value) => {
                const mylogin = localStorage.getItem('login');
                return (
                    mylogin ? (<EditProduct history={props.history} />) : (<AdminFront history={props.history} />)
                )
            }}

        </ProductConsumer>
    )
}
