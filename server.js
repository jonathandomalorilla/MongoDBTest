require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let usersCollection;

async function init() {
  await client.connect();
  const db = client.db("sample_mflix");
  usersCollection = db.collection("users");
  console.log("✅ Connected to MongoDB");
}
init();

// GET
app.get('/users', async (req, res) => {
  const users = await usersCollection.find().toArray();
  res.json(users);
});

// ADD
app.post('/users', async (req, res) => {
  const result = await usersCollection.insertOne(req.body);
  res.json(result);
});

// UPDATE
app.put('/users/:id', async (req, res) => {
  const result = await usersCollection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.json(result);
});

// DELETE
app.delete('/users/:id', async (req, res) => {
  const result = await usersCollection.deleteOne(
    { _id: new ObjectId(req.params.id) }
  );
  res.json(result);
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));