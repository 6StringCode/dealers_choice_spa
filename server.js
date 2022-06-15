const { syncAndSeed, conn, Collector, Guitar, Collection } = require('./db');
const db = require('./db');
const express = require('express');
const app = express();
const path = require('path');


app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/collectors', async(req, res, next)=> {
    try {
      res.send(await Collector.findAll());
    }
    catch(ex){
      next(ex);
    }
  });
  

const port = process.env.PORT || 3001;

const init = async()=> {
    try {
        console.log('db setup'); 
        await db.syncAndSeed();
        app.listen(port, ()=> console.log(`listening on port ${port}`));
    }
    catch(ex){
        console.log(ex);
    }
};

init();