import express from 'express';
import {register,login,user} from '../controller/loginControl.js';
import auth from '../middleware/auth.js';

const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.get('/user',user);

export default router;
