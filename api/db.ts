// @ts-nocheck
const mongoose = require('mongoose');
require('dotenv').config()
let DBNAME = ''
console.log(process.env.DB_NAME);
switch(process.env.DB_NAME){
    case 'development':
        DBNAME = "GraphQL";
        break;
    case 'testing':
        DBNAME = "TestDB"
        break
}

async function run(){

    try{
         await mongoose.connect(`mongodb://127.0.0.1:27017/${DBNAME}`,async ()=>{
             if(DBNAME == 'development') console.log('MongoDB Connected on Local')
             if(DBNAME == 'testing'){
                 await dropDatabase()
                 console.log('DB Flush')
                }
         }).then().catch(err=> console.log(err));
        
        

    }catch(err){
        throw new Error('Error is ==>>>'+ err);
    }
}
run()
