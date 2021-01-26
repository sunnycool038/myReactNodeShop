import mongoose from 'mongoose';
import User from '../modules/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register=async (req,res)=>{
    const {name, email, password} = req.body;
    console.log(req.body);
    if(!name || !email || !password){ 
        console.log('there is error');
    }
    console.log(email);
    User.findOne(email)
    .then(user=>{
        return res.status(400).json({message:'user already exist'})
    }).catch((err)=>{
        return res.status(401).json({message:'there is error'})
    });
    const newUser= new User({
        name,
        email,
        password
    })
    console.log(newUser);
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            console.log(newUser.password);
            if(err) return res.status(400).json({message:'you are'})
            newUser.password=hash;
            console.log(newUser.password);
            newUser.save().then(user=>{
                console.log('this is funny');
                console.log(req.body);
                jwt.sign(
                    {id: user.id},
                    process.env.JWT_SECRET,
                    {expiresIn:3600},
                    (err,token)=>{
                        if(err) return res.status(404).json({message:'i am'})
                        return res.json({
                            token,
                            user: {
                                id:user.id,
                                name:user.name,
                                email:user.email
                            }
                        });
                        
                    }
                )
                
            }).catch((err)=>{
                console.log('error caught')
            })
        })
    })
}

export const login=(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400).json({message:'please fill all fields'})
    }
    User.findOne({email})
    .then(user=>{
        if(!user) return res.status(404).json({message:'user does not exist'});
        bcrypt.compare(password,user.password)
        .then(isMatch=>{
            if(!isMatch) return res.status(400).json({message:'invalid credentials'});
            jwt.sign(
                {id: user.id},
                process.env.JWT_SECRET,
                {expiresIn:3600},
                (err,token)=>{
                    if(err) throw err
                    res.json({
                        token,
                        user: {
                            name:user.name,
                            id:user.id,
                            email:user.email
                        }
                    });
                    
                }
            )
        })
    });  
}

export const user = (req,res)=>{
    User.findById(req.user.id)
    .select('-password')
    .then(user=>res.json(user));
}