import { Worker } from "worker_threads";

export class WorkerController {
    private readonly file: string;
    private readonly threadCount: number;

    constructor(file: string, threadCount?: number) {
        this.file = file;
        this.threadCount = threadCount || 1;
   }

   public createWorker(): Promise<string> {
        return new Promise((resolve, reject) => {
            const worker = new Worker(this.file, {
                workerData: {
                    threadCount: this.threadCount
                }
            });
            worker.on("message", (data) => {
                resolve(`Resultado: ${data}`);
            });
            worker.on("error", (error) => {
                reject(`Error: ${error}`);
            });
            worker.on("exit", (code) => {
                if (code !== 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`));
                }
            });
        });
    }
}