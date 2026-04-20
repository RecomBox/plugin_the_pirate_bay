// External Packages


// Local Packages
import type {InputPayload, OutputPayload} from "@plugin_provider/global/types/get_torrents";
import request from "@plugin_provider/method/request";

// const TRACKERS: string[] = [
//     "udp://tracker.opentrackr.org:1337",
//     "udp://open.stealth.si:80/announce",
//     "udp://tracker.torrent.eu.org:451/announce",
//     "udp://tracker.bittor.pw:1337/announce",
//     "udp://public.popcorn-tracker.org:6969/announce",
//     "udp://tracker.dler.org:6969/announce",
//     "udp://exodus.desync.com:6969",
//     "udp://open.demonii.com:1337/announce",
//     "udp://glotorrents.pw:6969/announce",
//     "udp://tracker.coppersurfer.tk:6969",
//     "udp://torrent.gresille.org:80/announce",
//     "udp://p4p.arenabg.com:1337",
//     "udp://tracker.internetwarriors.net:1337",
// ]

async function extractPrintTrackers(id: string): Promise<string[]> {
    let url = `https://apibay.org/t.php?id=${id}`

    let res = await new request({
        url: url,
        method: "get",
    }).send();

    const data = res.output_payload?.body;


    const funcRegex = /function\s+print_trackers\s*\([^)]*\)\s*{([\s\S]*?)}/;
    const funcMatch = funcRegex.exec(source);

    if (!funcMatch || funcMatch[1] === undefined) {
        return []; // No print_trackers found
    }

    const funcBody: string = funcMatch[1];

    const trackerRegex = /encodeURIComponent\(['"]([^'"]+)['"]\)/g;
    const trackers: string[] = [];

    let match: RegExpExecArray | null;
    while ((match = trackerRegex.exec(funcBody)) !== null) {
        if (match[1]) {
        trackers.push(match[1]);
        }
    }

    return trackers;
}


export default async function(input_payload: InputPayload): Promise<OutputPayload> {


    let url = `https://apibay.org/t.php?id=${input_payload.id}`

    let res = await new request({
        url: url,
        method: "get",
    }).send();

    const data = res.body_json();


    let info_hash = data.info_hash;
    let title =  data.name;
    const torrent_url = `magnet:?xt=urn:btih:${info_hash}&dn=${encodeURIComponent(title)}${TRACKERS.map(tr => `&tr=${encodeURIComponent(tr)}`).join("")}`;

    
    return [{
        title,
        torrent_url
    }];
}