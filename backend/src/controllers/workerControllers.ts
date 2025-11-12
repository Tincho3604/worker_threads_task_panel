import { time } from "console";
import { stat } from "fs";
import { Worker } from "worker_threads";

export class WorkerController {
    private readonly file: string;
    private readonly threadCount: number;
    public information: any
    private status: number;

    constructor(file: string, threadCount?: number) {
        this.file = file;
        this.threadCount = threadCount || 1;
        this.status = 0;
   }

    // Método que crea y retorna un nuevo worker.
    public createWorker(): Worker {
        const worker = new Worker(this.file, {
            workerData: {
                threadCount: this.threadCount
            }
        });
        this.proccessWorkers(worker);
        return worker;
    }

    private proccessWorkers(worker: Worker): void {
        worker.on("message", (timestamp) => {
            const memory = (process.memoryUsage().rss / 1024 / 1024).toFixed(0);
            const cpu = process.cpuUsage();
            this.information = {
                threadId: worker.threadId,
                memory: `${memory} MB`,
                cpu: cpu.system,
                status: this.status,
                time: `${timestamp}ms`
            }
        });
        
        worker.on("error", (error) => {
            console.error('Error en el worker:', error);
        });
        
        
        worker.on("exit", (code) => {
            if (code !== 0) {
                console.error(`Worker stopped with exit code ${code}`);
            }
        });
        
        worker.postMessage(worker.threadId);
    }
}