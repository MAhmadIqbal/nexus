import {objectType, extendType, stringArg, idArg, nonNull, intArg } from 'nexus'
import { createTextChangeRange } from 'typescript'
import {ObjectId} from 'mongoose'
let ObjectId = require('mongodb').ObjectId;

export const Storage = objectType({
    name:'Storage',
    definition(t) {
        t.id('_id')
        t.id('fruit')
        t.string('name')
        t.int('amount')
    },
})

export const StorageQuery = extendType({
    type:'Query',
    definition(t) {
        t.list.field('storage',{
            type:'Storage',
            resolve(_root,_args,ctx){
                console.log(ctx);
                return ctx.findStorage()
            }
        })
    },
})

export const StorageMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('updateStorage',{
            type:'Storage',
            args:{
                fruit:nonNull(idArg()),
                name:nonNull(stringArg()),
                amount:nonNull(intArg()),
            },
            resolve(_root, args, ctx) {
                
                console.log(args);
                let fruitUpdated = ctx.updateStorage(args.fruit,args);
                if(!fruitUpdated){
                    throw new Error('Could not find fruit with id ' + args._id)
                }
                return fruitUpdated
            }
        })
    }
})