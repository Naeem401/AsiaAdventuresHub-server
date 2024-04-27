const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');

require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());



const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.47zrhkq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    const countriesCollection = client.db("touristsSpot").collection("countries");
    const touristsSpotCollection = client.db("touristsSpot").collection("spot");
  
    app.post("/addTouristsSpot", async (req, res) => {
      console.log(req.body);
      const result = await touristsSpotCollection.insertOne(req.body);
      console.log(result);
      res.send(result)
    })
    app.get("/addTouristsSpot", async (req, res) => {
      const touristsSpot = await touristsSpotCollection.find().toArray();
      res.json(touristsSpot);
    });
    app.get("/countries", async (req, res) => {
      const countries = await countriesCollection.find().toArray();
      res.json(countries);
    });

    app.get("/", (req, res) => {
      res.send("Asia Adventures Hub Server is running!");
    });

    app.listen(port, () => {
      console.log(`Asia Adventures Hub is running on Port:${port}`);
    });
    
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
