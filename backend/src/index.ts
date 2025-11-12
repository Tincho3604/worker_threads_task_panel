import express from 'express';
import cors from 'cors';
import path from 'path';
import { WorkerController } from "./controllers/workerControllers";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/tasks', async (_req, res) => {

  for (let i = 1; i < 3; i++) {
    console.log(`Hilo ${i} ejecutandose`);
    const workerController = new WorkerController(path.resolve(__dirname, './heavyTasks/task.js'), 2);
    const worker = workerController.createWorker();
    worker.on('message', () => {
      console.log(`Resultado del worker ${i}:`, workerController.information);
    })
  }
  
  res.send({ message: 'Tareas iniciadas' });
});
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});


/*

*/