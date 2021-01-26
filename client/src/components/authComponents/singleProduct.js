import React from 'react';
import { ProductConsumer } from '../../context';
import useTable from './useTables';
import { useTables } from './useTables';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { ButtonContainer, MyButtonContainer } from '../button';
import { useHistory } from 'react-router-dom';


const headCells = [
  { id: 'title', label: 'title' },
  { id: 'company', label: 'company' },
  { id: 'info', label: 'info' },
  { id: 'details', label: 'details' },
  { id: 'price', label: 'price' },
  { id: 'edit', label: 'edit' },
  { id: 'delete', label: 'delete' }
]


export default function SingleProduct({ product, products }) {
  const { _id, title, price, company, info, details } = product;
  const history = useHistory();
  return (
    <ProductConsumer>
      {value => {
        const { setEditProduct, handleDelete } = value;
        return (
          <>
            <TableRow key={_id}>
              <TableCell>{title}</TableCell>
              <TableCell>{company}</TableCell>
              <TableCell>{info}</TableCell>
              <TableCell>{details}</TableCell>
              <TableCell>{price}</TableCell>
              <TableCell><ButtonContainer onClick={() => { setEditProduct(product, product._id); history.push('/admin/allProduct/edit') }}><i class="fas fa-edit"></i></ButtonContainer></TableCell>
              <TableCell><MyButtonContainer onClick={() => { handleDelete(product._id); history.push('/admin/allProducts'); }}><i class="fas fa-trash-alt"></i></MyButtonContainer></TableCell>
            </TableRow>
          </>
        )
      }
      }
    </ProductConsumer>
  )

}
