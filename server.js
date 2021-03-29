const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

const mongoose = require('mongoose');


const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('DB connection successful!')).catch(err => {
    console.log('💣 NOT CONNETED');
    console.log(err);
});

const app = require('./app');


const port = process.env.PORT || 3000;
const server = app.listen(port,()=>{
    console.log(process.env.NODE_ENV);
    console.log(`Server Started on ${port}`);
});

process.on('unhandledRejection',(err)=>{
    console.log('UNHANDLED REJECTION BOOOOMMMM!!! 💣 , Shutting Down');
    console.log(err.name,err.message);
    server.close(()=>{
      process.exit(1);
    });
});
  
process.on('SIGNTERM',()=>{
    console.log('SIGNTERM RECEIVED. Shutting down slowing');
    server.close(()=>{
      process.exit(1);
    });
})