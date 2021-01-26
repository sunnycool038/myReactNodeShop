import mongoose from 'mongoose';
import Product from '../modules/product.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createProduct=async (req,res)=>{
    const {title,company,info,details,price,selectedFile} = req.body;
    if(!title || !company || !info ||!details ||!price ||!selectedFile){ 
        console.log('there is error');
    }
    console.log(title);
    Product.findOne(title)
    .then(user=>{
        return res.status(400).json({message:'user already exist'})
    }).catch((err)=>{
        return res.status(401).json({message:'there is no error'})
    });
    const newProduct= new Product({
        title,
        company,
        info,
        details,
        price,
        selectedFile
    })
    newProduct.save().then(product=>{
        console.log('this is funny');
        jwt.sign(
            {id: product.id},
            process.env.JWT_SECRET,
            {expiresIn:3600},
            (err,token)=>{
                if(err) return res.status(404).json({message:'i am'})
                return res.json({
                    token,
                    user: {
                        id:product.id,
                        title:product.title,
                        company:product.company,
                        info:product.info,
                        details:product.details,
                        price:product.price,
                        selectedFile:product.selectedFile,
                        inCart:product.inCart,
                        count:product.count,
                        total:product.total

                    }
                });
                
            }
        )
        
    }).catch((err)=>{
        console.log('error caught')
    })
}

export const getProducts = async (req,res)=>{
    try {
        const products = await Product.find();
        res.status(200).json(products)

    } catch (error) {
        res.status(404).json({message : "there is error here"});
    }
}

export const editProduct = async(req,res)=>{
    const {id:_id} = req.params;
    const post = req.body;
    console.log('this is it')
    console.log(_id);


    const editedProduct = await Product.findByIdAndUpdate(_id, {...post, _id}, {new:true});
    res.json(editedProduct);
}


export const deleteProduct = async(req,res)=>{
    const {id} = req.params;
    await Product.findByIdAndRemove(id);
    res.json({message: 'Post deleted successfully'});
}