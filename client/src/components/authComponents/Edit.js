import React, { useState } from 'react';
import AdminNavbarBack from '../AdminNavbarBack';
import { ProductConsumer } from '../../context';
import { TextField, Button, Typography, Container, Grid } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';

export const EditProduct = () => {

    const [postData, setPostData] = useState({ _id: '', title: '', company: '', info: '', details: '', price: '', selectedFile: '' });
    const classes = useStyles();
    const history = useHistory();
    return (
        <ProductConsumer>
            {(value) => {
                const { EditProduct, handleEdit } = value;
                setPostData(EditProduct);

                return (
                    <React.Fragment>
                        <AdminNavbarBack />
                        <Container maxWidth="sm">
                            <Grid xs={12} justify="center">
                                <form authocomplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={(e) => { e.preventDefault(); handleEdit(postData);  history.push("/admin/allProducts")  }} maxWidth="200px">
                                    <Typography variant="h6"> Edit Product</Typography>
                                    <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                                    <TextField name="company" variant="outlined" label="company" fullWidth value={postData.company} onChange={(e) => setPostData({ ...postData, company: e.target.value })} />
                                    <TextField name="info" variant="outlined" label="info" fullWidth value={postData.info} onChange={(e) => setPostData({ ...postData, info: e.target.value })} />
                                    <TextField id="outlined-multiline-static" rows={4} multiline variant="outlined" label="details" fullWidth value={postData.details} onChange={(e) => setPostData({ ...postData, details: e.target.value })} />
                                    <TextField id="standard-number" label="Price" type="number" fullWidth value={postData.price} onChange={(e) => setPostData({ ...postData, price: e.target.value })} />
                                    <div className={classes.fileInput}>
                                        <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                                    </div>
                                    <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="large" type="submit" fullWidth>Submit</Button>
                                </form>
                            </Grid>
                        </Container>
                    </React.Fragment>
                )
            }}

        </ProductConsumer>
    )
}