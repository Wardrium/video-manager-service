export interface VideoMeta {
    name: string;
    fileType: string;
}

export interface Video extends VideoMeta {
    id: string;
}