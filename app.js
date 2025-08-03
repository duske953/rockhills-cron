import express from 'express';
import moment from 'moment';
import mongoose from 'mongoose';

const app = express();

// (async function () {
//   try {
//     await mongoose.connect(process.env.MONGO_DB);
//     console.log('db connected');
//   } catch (err) {
//     console.log('Something went wrong with the db connection');
//   }
// })();

async function deactivateWorker() {
  const workers = await mongoose.connection.db.collection('Worker');
  await workers.updateMany({ isActive: true }, { $set: { isActive: false } });
}

app.get('/', async (req, res) => {
  // await deactivateWorker();
  res.send('okay');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('This port is listening');
});
