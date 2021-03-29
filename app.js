const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const userRouter = require('./routers/userRouter');
const viewRouter = require('./routers/viewRouter');
const productRouter = require('./routers/productRouter');
// the express is function when your assign express to app. Now that app will get all express methods
const app = express();

app.use(express.json());
app.use(cookieParser());
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
})

app.use('/',viewRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/products',productRouter);

app.all('*', function(req, res){
    res.status(404).send('what???');
  });



module.exports = app;