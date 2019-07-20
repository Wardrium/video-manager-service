import { Video, VideoMeta } from "../../../domain/Video";
import { VideoInfoService } from "./VideoInfoService";

export interface IVideoInfoService {
    addVideo(video: VideoMeta): Promise<Video>
    deleteVideo(id: string): Promise<void>
    getVideo(id: string): Promise<Video>
    listVideos(): Promise<Video[]>
}

let instance: IVideoInfoService;

export function getVideoInfoService(): IVideoInfoService {
    if (!instance) {
        instance = new VideoInfoService();
    }

    return instance;
}