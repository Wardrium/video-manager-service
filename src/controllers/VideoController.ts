import { Router } from "express";

import { VIDEO_FOLDER_URI } from "../configuration";
import { createVideoService } from "../services/video/VideoService";

const router: Router = Router();

router.get("/file/:fileName", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.download(`${VIDEO_FOLDER_URI}/${req.params.fileName}`,(err) => {
        if (err && err.message.includes("ENOENT")) {
            res.status(404).send("Requested file does not exist.");
        }
    });
});

router.get("/list", (req, res) => {
    const videoService = createVideoService();

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(videoService.listAvailableVideos()));
});

export const VideoController: Router = router;