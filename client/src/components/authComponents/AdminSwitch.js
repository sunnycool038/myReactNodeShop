import React from 'react';
import { AdminBackend } from './AdminBackend';
import { AdminFront } from './AdminFront';
import { ProductConsumer } from '../../context';


export const AdminSwitch = (props) => {
    return (
        <ProductConsumer>
            {(value) => {
                const mylogin = localStorage.getItem('login');
                console.log(mylogin)
                return (
                    mylogin ? (<AdminBackend history={props.history} />) : (<AdminFront history={props.history} />)
                )
            }}

        </ProductConsumer>
    )
}


