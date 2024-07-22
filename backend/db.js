const mongoose = require('mongoose');
const connectToMongo = async () => {
  try {
      await mongoose.connect('mongodb://localhost:27017', {
        // await mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority', { 
      useNewUrlParser: true, useUnifiedTopology: true, });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }} ;
module.exports = connectToMongo;




// const mongoose = require('mongoose');
// const mongoURI= "mongodb://localhost:27017"

// const connectToMongo=()=>{
//     mongoose.connect(mongoURI , ()=>{
//         console.log("connected to Mongo Successfully");
//     })
// }
// module.exports = connectToMongo;
