import express from 'express';
import {createProduct,getProducts,editProduct,deleteProduct} from '../controller/productAccess.js';
import auth from '../middleware/auth.js';

const router = express.Router();


router.post('/createProduct',auth, createProduct);
router.get('/getProducts',getProducts);
router.patch('/edit/:id',auth,editProduct);
router.delete('/delete/:id',auth,deleteProduct);


export default router;