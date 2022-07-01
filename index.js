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
        
        
        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = todoCollection.find(query);

            const services = await cursor.toArray();
            res.send(services);
        });
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