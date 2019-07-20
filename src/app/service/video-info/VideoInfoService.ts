import crypto from "crypto";

import { IVideoInfoService } from "./IVideoInfoService";
import { Video, VideoMeta } from "../../../domain/Video";
import { getVideoDbAdaptor, IVideoDbAdaptor } from "../../../service-adaptor/db-adaptor/IVideoDbAdaptor";

export class VideoInfoService implements IVideoInfoService {
    private dbAdaptor: IVideoDbAdaptor;

    public constructor() {
        this.dbAdaptor = getVideoDbAdaptor();
    }

    public addVideo(videoMeta: VideoMeta): Promise<Video> {
        const id = VideoInfoService.generateIdForVideo();
        const video: Video = {
            id: id,
            name: videoMeta.name,
            fileType: videoMeta.fileType
        };
        return this.dbAdaptor.addVideo(video);
    }

    public deleteVideo(id: string): Promise<void> {
        return this.dbAdaptor.deleteVideo(id);
    }

    public getVideo(id: string): Promise<Video> {
        return this.dbAdaptor.getVideo(id);
    }

    public listVideos(): Promise<Video[]> {
        return this.dbAdaptor.listVideos();
    }

    private static generateIdForVideo(): string {
        return crypto.randomBytes(20).toString("hex");
    }
}