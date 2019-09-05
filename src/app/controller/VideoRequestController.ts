import { Router } from "express";

import { getAnimeTorrentAdaptor } from "../../service-adaptor/anime-torrent-adaptor/AnimeTorrentAdaptor";

const router: Router = Router();

router.post("/search", async(req, res) => {
    const animeTorrentAdaptor = getAnimeTorrentAdaptor();
    const searchText = "horriblesubs 720p";

    res.setHeader("Access-Control-Allow-origin", "*");
    res.setHeader("Content-Type", "application/json");

    const results = await animeTorrentAdaptor.search(searchText);
    res.send(JSON.stringify({
        "results": results
    }));
});

export const VideoRequestController: Router = router;