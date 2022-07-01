const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port =  process.env.PORT || 5000;

// milldle ware 
app.use(cors());



const uri = "mongodb+srv://todotask:KFhmghf31cuXL03h@cluster0.7oiep.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        await client.connect();
        const todoCollection = client.db("taskmanagement").collection("todotask");
        const todoCollection1 = client.db("taskmanagement1").collection("todotask1");
        
        
        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = todoCollection1.find(query);

            const allTodo = await cursor.toArray();
            res.send(allTodo);
        });

        app.post('/service', async (req, res) => {
            const newTask = req.body;
            console.log(newTask);
            const doc = {todo: newTask}
            const result = await todoCollection1.insertOne(doc);
            res.send(result);
        })

    }
    finally{
        // client.close();
    }

}
run().catch(console.dir)




app.get('/', (req, res) => {
    res.send('The Server is working')
  })
  
  app.listen(port, () => {
    console.log(`Running Port is --${port}`)
  })