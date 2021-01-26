import React from 'react';
import {Route,Switch} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './components/Cart';
import Defaults from './components/Defaults';
import Details from './components/Details';
import ProductList from './components/ProductList';
import Modal from './components/Modal';
import {AdminSwitch} from './components/authComponents/AdminSwitch';
import {Register} from './components/authComponents/Register';
import {MyProductBack} from './components/authComponents/MyProductBack';
import {EditSwitch} from './components/authComponents/EditSwitch';


function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={ProductList}></Route>
        <Route path="/Details" component={Details}></Route>
        <Route path="/Cart" component={Cart}></Route>
        <Route path="/admin/register" component={Register}></Route>
        <Route path="/admin/allProducts" component={MyProductBack} />
        <Route path="/admin/allProduct/edit" component={EditSwitch} />
        <Route path="/admin" component={AdminSwitch} />
        <Route  component={Defaults}></Route>
      </Switch>
      <Modal/>
    </React.Fragment>
  );
}

export default App;
