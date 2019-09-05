import { TorrentSearchResult } from "../../domain/TorrentSearchResult";
import { NyaaTorrentAdaptor } from "./NyaaTorrentAdaptor";

export interface IAnimeTorrentAdaptor {
    search(searchText: string): Promise<TorrentSearchResult[]>;
}

let instance: IAnimeTorrentAdaptor;

export function getAnimeTorrentAdaptor(): IAnimeTorrentAdaptor {
    if (!instance) {
        instance = new NyaaTorrentAdaptor();
    }

    return instance;
}