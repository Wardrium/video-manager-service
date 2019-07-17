import * as fs from "fs";
import * as path from "path";
import { SUPPORTED_VIDEO_FORMATS, VIDEO_FOLDER_URI } from "../../configuration";


export interface IVideoService {
    listAvailableVideos(): VideoInfo[];
}

export interface VideoInfo {
    id: string;
    name: string;
    fileType: string;
    subtitles: string[];
}

export class VideoService implements IVideoService {
    public listAvailableVideos(): VideoInfo[] {
        const videos: VideoInfo[] = [];

        fs.readdirSync(VIDEO_FOLDER_URI).forEach(file => {
            if (this.isSupportedFormat(file)) {
                videos.push({
                    id: this.getFileId(file),
                    name: this.getDisplayName(file),
                    fileType: this.getFileExtension(file),
                    subtitles: this.getSubtitlesFile(file),
                });
            }
        });

        return videos;
    }

    private isSupportedFormat(fileName: string): boolean {
        const extension = this.getFileExtension(fileName);

        return SUPPORTED_VIDEO_FORMATS.includes(extension);
    }

    private getFileId(file: string): string {
        return encodeURI(this.getFileName(file));
    }

    private getDisplayName(file: string): string {
        return this.getFileName(file);
    }

    private getSubtitlesFile(file: string): string[] {
        const fileName = this.getFileName(file);
        const subtitleFile = `${fileName}.vtt`;

        if (fs.existsSync(`${VIDEO_FOLDER_URI}/${subtitleFile}`)) {
            return ["EN"];
        } else {
            return [];
        }
    }

    private getFileName(file: string): string {
        return path.parse(file).name;
    }

    private getFileExtension(file: string): string {
        const ext = path.parse(file).ext;
        return ext.substr(1).toLowerCase(); // Remove the .
    }
}

export function createVideoService(): IVideoService {
    return new VideoService();
}