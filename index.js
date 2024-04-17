const express = require('express');
const app = express();
const port = 3000;

const bcrypt = require('bcrypt');
app.use(express.json());

app.post('/register',async(req,res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);

 let result = await client.db('classCRUD').collection('user').insertOne(
    {
      username: req.body.username,
      password: hash,
      name: req.body.name,
      email: req.body.email
    }
  )
  res.send('Register successfully')
})

app.post('/login',async(req,res) => {
  let result = await client.db('classCRUD').collection('user').findOne({
    username: req.body.username
  })
  if (!result) {
    res.send('Username not found')
  } else {
    if(bcrypt.compareSync(req.body.password, result.password) == true){
      res.send('Login successfully')
    } else {
      res.send('Wrong password')
    }
    
  }
  console.log(result)

})

app.get('/')

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://Wong_Hui_Chin:Y0304h1023@cluster0.ucgr9bl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);