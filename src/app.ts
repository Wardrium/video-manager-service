import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";

import { VideoController } from "./app/controller/VideoController";

createConnection().then(async connection => {
   const app = express();
   const port = 8081;

   app.use('/videos', VideoController);

   app.listen(port, () => {
      console.log(`server started at http://localhost:${port}`);
   });
}).catch(error => console.log("TypeORM connection error: ", error));