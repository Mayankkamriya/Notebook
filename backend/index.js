const connectToMongo = require('./db');
const express = require('express');
var cors =require('cors');

connectToMongo();

const app = express();
const port = 5000;  // Because he used 3000 in chrome web and 5000 Thunderclient

app.use(cors());
app.use(express.json());// if we want to use 'req.body' then we need to use middleware which is 'express.json'. After writing this we can deal in json. we can send request in json

app.use('/api/auth', require ('./routes/auth'))
app.use('/api/notes', require ('./routes/notes'))

app.get('/', (req,res) => 
    res.send('Hello home')
),
app.get('/api/login', (req,res) => //by adding '/api/login' in cromeweb you get 'Hello login'
    res.send('Hello login')
)

app.listen(port, () => {
  console.log(`NoteBook listening at http://localhost:${port}`);
});

