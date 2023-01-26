import {objectType, extendType, stringArg, nullable, nonNull, intArg, idArg } from 'nexus'
import { createTextChangeRange } from 'typescript'

export const Fruit = objectType({
    name:'Fruit',
    definition(t) {
        t.id('_id')
        t.string('name')
        t.string('description')
        t.int('limit')
    },
})

export const FruitQuery = extendType({
    type:'Query',
    definition(t) {
        t.nonNull.list.field('fruits',{
            type: 'Fruit',
            resolve(_root, _args, ctx){
                return ctx.findFruit()
            },
        })
    },
})

export const FruitMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('createFruit',{
            type:'Fruit',
            args: {
                name:nonNull(stringArg()),
                description:nonNull(stringArg()),
                limit:nonNull(intArg()),
            },
            resolve(_root,args,ctx) {
                const fruit = {
                    name:args.name,
                    description:args.description,
                    limit: args.limit,
                }
                const createFruit= ctx.createFruit(fruit)
                return createFruit
            }
        })
        t.nonNull.field('updateFruit',{
            type:'Fruit',
            args:{
                fruitId:nonNull(idArg()),
                name:nullable(stringArg()),
                description:nullable(stringArg()),
                limit: nullable(intArg()),
            },
            async resolve(_root, args, ctx) {
                console.log(args);
                let body = args
                // delete body.fruitId;
                let fruitUpdated =await ctx.updateFruit(args.fruitId,body)
                if(!fruitUpdated){
                    throw new Error('Could not find fruit with id ' + args._id)
                }
                console.log(fruitUpdated);
                return fruitUpdated
            }
        })
        t.nonNull.field('deleteFruit',{
            type:'Boolean',
            args:{
                fruitId:nonNull(idArg()),
            },
            resolve(_root, args, ctx) {
                
                let fruitDelete = ctx.deleteFruit(args.fruitId)
                if(!fruitDelete){
                    throw new Error('Could not find draft with id ' + args.draftId)
                }
                return true
            }
        })
    }
})