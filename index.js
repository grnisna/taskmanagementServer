const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port =  process.env.PORT || 5000;

// milldle ware 
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://todotask:KFhmghf31cuXL03h@cluster0.7oiep.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        await client.connect();
        const currentDayTask = client.db("taskmanagement").collection("todotask");
        const nextDayTask = client.db("next_day_task").collection("next_task");
        
        
        app.get('/currentDay', async (req, res) => {
            const query = {};
            const cursor = currentDayTask.find(query);
            const allTodo = await cursor.toArray();
            res.send(allTodo);
        });

        app.post('/currentDay', async (req, res) => {
            const newTask = req.body;            
            const result = await currentDayTask.insertOne(newTask);
            res.send(result);
        })


        app.get('/nextDay', async (req, res) => {
            const query = {};
            const cursor = nextDayTask.find(query);
            const allTodo = await cursor.toArray();
            res.send(allTodo);
        });
        app.post('/nextDay', async (req, res) => {
            const newTask = req.body;            
            const result = await nextDayTask.insertOne(newTask);
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