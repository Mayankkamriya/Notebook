const mongoose = require('mongoose');
const connectToMongo = async () => {   //predefined function 
  const mongo_uri = process.env.MONGO_URL
  try {

      await mongoose.connect(mongo_uri, { // Type '/notebook' after link so that our data can store in database of file name 'inotebook'
      useNewUrlParser: true, useUnifiedTopology: true, });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }} ;

module.exports = connectToMongo;

