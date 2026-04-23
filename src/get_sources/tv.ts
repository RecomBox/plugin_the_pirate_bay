// External Packages



// Local Packages
import type {InputPayload, OutputPayload} from "@plugin_provider/global/types/get_sources";
import request from "@plugin_provider/method/request";
import { IGNORE_TITLE } from ".";


export default async function get(input_payload: InputPayload): Promise<OutputPayload> {

    let prefer_title = input_payload.title_secondary || input_payload.title;

    let season = input_payload.season.toString().padStart(2, "0");
    let episode = input_payload.episode.toString().padStart(2, "0");

    let formatted_query = `${prefer_title} S${season}E${episode}`.trim();

    let query_term = input_payload.search?.trim() ? input_payload.search.trim() : formatted_query;

    let url = `https://apibay.org/q.php?q=${encodeURIComponent(query_term)}&cat=0`

    let res = await new request({
        url: url,
        method: "get",
    }).send();

    let data = res.body_json();

    data = data.filter((t:any) => parseInt(t.seeders||0) > 0);
    data.sort((a:any, b:any) => parseInt(b.seeders||0) - parseInt(a.seeders||0));

    let output_payload = [];
    for (const item of data) {
        if ((item.name ||"" as string).toLowerCase().includes(IGNORE_TITLE)) continue;
        
        output_payload.push({
            id: item.id,
            title: `${item.name} [seeders: ${parseInt(item.seeders)||0}]`,
        });
    }
    
    return output_payload;
}