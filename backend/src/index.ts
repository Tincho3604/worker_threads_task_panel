import express from 'express';
import cors from 'cors';
import { WorkerController } from "./controllers/workerControllers";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => {
  res.send({ status: 'ok' });
});

app.post('/tasks', async (_req, res) => {
  console.log("Tasks");
  const workerController = new WorkerController('./heavyTasks/task.js', 2);
  const workerResult = await workerController.createWorker();
  console.log(workerResult);
  res.send({ status: 'ok' });
});

app.get('/tasks', (_req, res) => {
  res.send({ status: 'ok' });
});

app.get('/tasks/:id', (_req, res) => {
  res.send({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
