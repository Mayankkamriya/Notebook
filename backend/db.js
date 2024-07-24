const mongoose = require('mongoose');
const connectToMongo = async () => {   //predefined function 
  try {
      await mongoose.connect('mongodb://localhost:27017', { 
      useNewUrlParser: true, useUnifiedTopology: true, });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }} ;

module.exports = connectToMongo;


