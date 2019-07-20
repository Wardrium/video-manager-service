import { Video } from "../../domain/Video";
import { VideoDbAdaptor } from "./VideoDbAdaptor";

export interface IVideoDbAdaptor {
    addVideo(video: Video): Promise<Video>;
    deleteVideo(id: string): Promise<void>;
    getVideo(id: string): Promise<Video>;
    listVideos(): Promise<Video[]>;
}

let instance: IVideoDbAdaptor;

export function getVideoDbAdaptor(): IVideoDbAdaptor {
    if (!instance) {
        instance = new VideoDbAdaptor();
    }

    return instance;
}