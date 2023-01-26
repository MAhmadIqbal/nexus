// @ts-nocheck

import * as mongoose from 'mongoose'

const fruitSchema =new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    description:{
        type:String,
        max:30,
        min:10,
        required:true
    },
    limit:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('Fruit',fruitSchema);