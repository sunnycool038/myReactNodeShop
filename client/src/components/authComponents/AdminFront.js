import React, { useState } from 'react';
import AdminNavbar from '../AdminNavBar';
import { ProductConsumer } from '../../context';
import { TextField, Button, Typography, Container, Grid } from '@material-ui/core';
import useStyles from './styles';

export const AdminFront = (props) => {
    const [postData, setPostData] = useState({ name: '', email: '', password: '' });
    const classes = useStyles();
    return (
        <ProductConsumer>
            {(value) => {
                const { loginHandle } = value;
                return (
                    <React.Fragment>
                        <AdminNavbar />
                        <Container maxWidth="sm">
                            <Grid xs={12} justify="center">
                                <form authocomplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={(e) => { e.preventDefault(); loginHandle(postData); if (value.login === true) { props.history.push("/admin") } }} maxWidth="200px">
                                    <Typography variant="h6"> login</Typography>
                                    <TextField name="name" variant="outlined" label="name" fullWidth value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
                                    <TextField name="email" variant="outlined" label="email" fullWidth value={postData.email} onChange={(e) => setPostData({ ...postData, email: e.target.value })} />
                                    <TextField id="outlined-password-input" type="password" variant="outlined" label="password" fullWidth value={postData.password} onChange={(e) => setPostData({ ...postData, password: e.target.value })} />
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
