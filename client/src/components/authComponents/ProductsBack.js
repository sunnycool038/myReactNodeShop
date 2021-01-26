import React from 'react';
import { ProductConsumer } from '../../context';
import { Paper, Container } from '@material-ui/core';
import AdminNavbarBack from '../AdminNavbarBack';
import SingleProduct from './singleProduct';
import { useTables } from './useTables';
import TableBody from '@material-ui/core/TableBody';




const headCells = [
    { id: 'title', label: 'title' },
    { id: 'company', label: 'company' },
    { id: 'info', label: 'info' },
    { id: 'details', label: 'details' },
    { id: 'price', label: 'price' },
    { id: 'edit', label: 'edit' },
    { id: 'delete', label: 'delete' }
]


export default function ProductBack({ products }) {
    const { TblContainer, TblHead } = useTables(products, headCells);
    return (
        <React.Fragment>
            < AdminNavbarBack />
            <Container>
                <Paper>
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            <ProductConsumer>
                                {value => {
                                    const { products } = value;

                                    return products.map(product => {
                                        return (
                                            <SingleProduct key={product._id} product={product} products={products} />
                                        )
                                    })
                                }}
                            </ProductConsumer>
                        </TableBody>
                    </TblContainer>
                </Paper>
            </Container>
        </React.Fragment>

    )
}