// @ts-nocheck

import './db'
// import {Fruit,Storage} from './model'
const Fruit = require('./model/Fruit')
const Storage = require('./model/Storage')
import * as mongoose from 'mongoose'
let ObjectId = require('mongodb').ObjectId;


export const context = {
    findFruit: async () => await Fruit.find(),
    createFruit: async (args) => await Fruit.create(args),
    updateFruit: async (fruitId,body) => await Fruit.findByIdAndUpdate(fruitId,body,{new:true}),
    deleteFruit: async (fruitId) => await Fruit.findByIdAndDelete(fruitId),
    findStorage: async () => await Storage.find(),
    updateStorage: async (fruit,args) => await Storage.findOneAndUpdate({fruit:ObjectId(fruit)},args,{upsert:true,new:true})
}