import { Router } from "express";

import { PROCESSED_VIDEO_FOLDER_URI } from "../../configuration";
import { getVideoInfoService } from "../service/video-info/IVideoInfoService";

const router: Router = Router();

router.get("/", async (req, res) => {
    const videoInfoService = getVideoInfoService();

    res.setHeader("Content-Type", "application/json");

    const videos = await videoInfoService.listVideos();
    res.send(JSON.stringify(videos));
});

router.get("/:videoId", async (req, res) => {
    const videoInfoService = getVideoInfoService();

    const video = await videoInfoService.getVideo(req.params.videoId);
    const fileName = `${video.id}.${video.fileType}`;
    res.sendFile(`${PROCESSED_VIDEO_FOLDER_URI}/${fileName}`,(err) => {
        if (err && err.message.includes("ENOENT")) {
            res.status(404).send("Requested video does not exist.");
        }
    });
});

router.get("/:videoId/about", async(req, res) => {
    const videoInfoService = getVideoInfoService();

    res.setHeader("Content-Type", "application/json");

    const video = await videoInfoService.getVideo(req.params.videoId);
    res.send(JSON.stringify(video));
});

router.get("/:videoId/subtitles", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const fileName = `${req.params.videoId}.vtt`;
    res.sendFile(`${PROCESSED_VIDEO_FOLDER_URI}/${fileName}`,(err) => {
        if (err && err.message.includes("ENOENT")) {
            res.status(404).send("Requested subtitles do not exist.");
        }
    });
});

export const VideoController: Router = router;