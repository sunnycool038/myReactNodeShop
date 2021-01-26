import mongoose from 'mongoose';
const Schema=mongoose.Schema;

const UserSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true,
    },
    info:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    selectedFile:{
        type:String,
        required:true
    },
    inCart:{
        type:Boolean,
        default:false
    },
    count:{
        type:Number,
        default:0
    },
    total:{
        type:Number,
        default:0
    },
    register_date:{
        type:Date,
        default:Date.now
    },
});
const Product = mongoose.model('Product',UserSchema);

export default Product;