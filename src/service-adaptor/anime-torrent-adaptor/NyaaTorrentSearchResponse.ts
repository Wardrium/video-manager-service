import { TorrentSearchResult } from "../../domain/TorrentSearchResult";

export interface NyaaTorrentSearchResult {
    name: string;
    magnetLink: string;
    fileSize: string;
    seeders: number;
    leechers: number;
}

export function toTorrentSearchResult(result: NyaaTorrentSearchResult): TorrentSearchResult {
    return {
        name: result.name,
        magnetLink: result.magnetLink,
        fileSize: result.fileSize,
        seeders: result.seeders,
        leechers: result.leechers
    };
}