import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import bodyParser from "body-parser";

import { VideoController } from "./app/controller/VideoController";
import { VideoRequestController } from "./app/controller/VideoRequestController";

createConnection().then(async connection => {
   const app = express();
   const port = 8081;

   app.use(bodyParser.urlencoded({
      extended: true
   }));
   app.use(bodyParser.json());

   app.use("/videos", VideoController);
   app.use("/request", VideoRequestController);

   app.listen(port, () => {
      console.log(`server started at http://localhost:${port}`);
   });
}).catch(error => console.log("TypeORM connection error: ", error));