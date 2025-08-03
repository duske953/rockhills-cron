require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log('db connected');
  } catch (err) {
    console.log(err);
  }
}

async function deactivateWorker() {
  const workers = await mongoose.connection.db.collection('Worker');
  await workers.updateMany({ isActive: true }, { $set: { isActive: false } });
}

app.get('/', async (req, res) => {
  await connectDb();
  await deactivateWorker();
  res.send('okay');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('This port is listening');
});
