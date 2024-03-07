import { Worker, isMainThread, workerData } from "node:worker_threads";

export const crawlWebsite = async (url: string) => {
  const worker = new Worker(__filename, {
    workerData: {
      url,
    } 
  });
  const promise = new Promise((resolve, reject) => {

    worker.on("message", (message) => { 
      if(message === 'done') {
        resolve('done')
      }


    });
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });


  return [worker, promise]
};

if(!isMainThread) {
  const data = workerData

  console.log('I am a worker')
  self.postMessage('done')
}