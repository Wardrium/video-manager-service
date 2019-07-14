import express, { Router } from "express";

const videoFolderURL = "/var/lib/file-server";

const router: Router = Router();

router.use(express.static(videoFolderURL,
    {
        setHeaders: (res) => {
            res.header("Access-Control-Allow-Origin", "*")
        }
    }
));

export const VideoController: Router = router;