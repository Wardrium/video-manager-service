import { Column, Entity, PrimaryColumn } from "typeorm";

import { Video } from "../../domain/Video";

@Entity("Video")
export class VideoDbEntity {
    @PrimaryColumn({
        length: 40
    })
    id: string;

    @Column({
        length: 100
    })
    name: string;

    @Column({
        length: 3
    })
    fileType: string;

    public static fromDomain(video: Video): VideoDbEntity {
        const videoDbEntity = new VideoDbEntity();
        videoDbEntity.id = video.id;
        videoDbEntity.name = video.name;
        videoDbEntity.fileType = video.fileType;

        return videoDbEntity;
    }

    public static toDomain(videoDbEntity: VideoDbEntity): Video {
        return {
            id: videoDbEntity.id,
            name: videoDbEntity.name,
            fileType: videoDbEntity.fileType,
        };
    }
}