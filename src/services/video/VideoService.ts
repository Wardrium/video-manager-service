import * as fs from "fs";
import * as path from "path";
import { SUPPORTED_VIDEO_FORMATS, VIDEO_FOLDER_URI } from "../../configuration";


export interface IVideoService {
    listAvailableVideos(): VideoInfo[];
}

export interface VideoInfo {
    displayName: string;
    fileName: string;
    subtitles: string | null;
}

export class VideoService implements IVideoService {
    public listAvailableVideos(): VideoInfo[] {
        const videos: VideoInfo[] = [];

        fs.readdirSync(VIDEO_FOLDER_URI).forEach(file => {
            if (this.isSupportedFormat(file)) {
                videos.push({
                    fileName: file,
                    displayName: this.getDisplayName(file),
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

    private getDisplayName(file: string): string {
        return this.getFileName(file);
    }

    private getSubtitlesFile(file: string): string | null {
        const fileName = this.getFileName(file);
        const subtitleFile = `${fileName}.vtt`;

        if (fs.existsSync(`${VIDEO_FOLDER_URI}/${subtitleFile}`)) {
            return subtitleFile
        } else {
            return null;
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