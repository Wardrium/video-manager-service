import { getRepository, Repository } from "typeorm";

import { IVideoDbAdaptor } from "./IVideoDbAdaptor";
import { Video } from "../../domain/Video";
import { VideoDbEntity } from "../db-entity/VideoDbEntity";

export class VideoDbAdaptor implements IVideoDbAdaptor {
    private repository: Repository<VideoDbEntity>;

    constructor() {
        this.repository = getRepository(VideoDbEntity);
    }

    public async addVideo(video: Video): Promise<Video> {
        const videoDbEntity = VideoDbEntity.fromDomain(video);

        const videoDbEntityRes = await this.repository.save(videoDbEntity);
        return VideoDbEntity.toDomain(videoDbEntityRes);
    }

    public async deleteVideo(id: string): Promise<void> {
        await this.repository.delete(id);
        return;
    }

    public async getVideo(id: string): Promise<Video> {
        const videoDbEntity = await this.repository.findOne(id);

        return VideoDbEntity.toDomain(videoDbEntity);
    }

    public async listVideos(): Promise<Video[]> {
        const videoDbEntities = await this.repository.find();

        return videoDbEntities.map((videoDbEntity) => {
            return VideoDbEntity.toDomain(videoDbEntity);
        });
    }
}