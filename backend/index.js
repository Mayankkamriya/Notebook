const connectToMongo = require('./db');
const express = require('express');
connectToMongo();

const app = express();
const port = 3000;

app.get('/', (req,res) =>
    res.send('Hello Manoj')
),
app.get('/api/v1/sinup', (req,res) => 
    res.send('Hello sinup')
),
app.get('/api/v1/login', (req,res) => 
    res.send('Hello login')
)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


