import { URL } from "url";

import axios from "axios";
import cheerio from "cheerio";

import { IAnimeTorrentAdaptor } from "./AnimeTorrentAdaptor";
import { TorrentSearchResult } from "../../domain/TorrentSearchResult";
import { NYAA_BASE_URL } from "../../configuration";
import { NyaaTorrentSearchResult, toTorrentSearchResult } from "./NyaaTorrentSearchResponse";

export class NyaaTorrentAdaptor implements IAnimeTorrentAdaptor {
    public async search(searchText: string): Promise<TorrentSearchResult[]> {
        const searchURL = this.buildSearchURL(searchText);

        try {
            const res: NyaaTorrentSearchResult[] = await axios.get(searchURL.toString())
                .then(res => res.data)
                .then((html: string) => {
                    return this.getTorrentSearchResultsFromSearchHTML(html);
                });


            return res.map((searchResult) => {
                return toTorrentSearchResult(searchResult);
            });
        } catch (e) {
            console.log("error", e);
        }
    }

    private buildSearchURL(searchText: string): URL {
        const searchTextFormatted = searchText.replace(" ", "+");

        const url = new URL(NYAA_BASE_URL);
        url.searchParams.append("f", NyaaFilter.NoFilter);
        url.searchParams.append("c", NyaaCategory.AllCategories);
        url.searchParams.append("q", searchTextFormatted);

        return url;
    }

    private getTorrentSearchResultsFromSearchHTML(searchHTML: string): NyaaTorrentSearchResult[] {
        const $: CheerioStatic = cheerio.load(searchHTML);
        const searchResults: NyaaTorrentSearchResult[] = [];

        $("table.torrent-list tbody tr").each((index, rowElement) => {
            searchResults.push(this.getTorrentSearchResultFromSearchRow($(rowElement)));
        });

        return searchResults;
    }

    private getTorrentSearchResultFromSearchRow(row: Cheerio): NyaaTorrentSearchResult {
        return {
            name: row.children("td:nth-child(2)").children("a:not(.comments)").attr("title"),
            magnetLink: row.children("td:nth-child(3)").children("a:last-child").attr("href"),
            fileSize: row.children("td:nth-child(4)").text(),
            seeders: parseInt(row.children("td:nth-child(5)").text()),
            leechers: parseInt(row.children("td:nth-child(6)").text()),
        };
    }
}

enum NyaaFilter {
    NoFilter = "0",
    NoRemakes = "1",
    TrustedOnly = "2",
}

enum NyaaCategory {
    AllCategories = "0_0",
    Anime = "1_0",
}