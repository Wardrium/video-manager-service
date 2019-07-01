import express from "express";
import { VideoController } from "./controller/video.controller";

const app = express();
const port = 8081;

app.use('/video/', VideoController);

app.listen(port, () => {
   console.log(`server started at http://localhost:${port}`);
});