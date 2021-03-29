const dotenv = require('dotenv');
dotenv.config({path:'./../config.env'});
const mongoose = require('mongoose');
const Product = require('../models/productModel');
const fs = require('fs');

// const products = require('./data.json')


const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

const products = JSON.parse(
fs.readFileSync(`${__dirname}/data.json`, 'utf-8')
);

async function importData(){
  try {
    await Product.create(products);
    console.log("Data Loaded");
  } catch (error) {
      console.log(error);
  }
  process.exit();
}

const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if(process.argv[2] === '--import'){
  importData();
}else if(process.argv[2] === '--delete'){
  deleteData();
}
