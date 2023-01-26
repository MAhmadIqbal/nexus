// @ts-nocheck

import * as mongoose from 'mongoose'

const storageSchema =new mongoose.Schema({
    fruit:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Fruit'
    },
    name:{
        type:String,
        unique:true,
        required:true
    },
    amount:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('Storage',storageSchema);