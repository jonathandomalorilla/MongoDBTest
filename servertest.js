require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;

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

    const db = client.db("sample_mflix");
    const usersCollection = db.collection("users");

    const users = await usersCollection.find().limit(5).toArray();

    console.log("Sample Users:");
    console.log(users);

  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

run();