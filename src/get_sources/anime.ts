// External Packages


// Local Packages
import type {InputPayload, OutputPayload} from "@plugin_provider/global/types/get_sources";
import request from "@plugin_provider/method/request";



export default async function get(input_payload: InputPayload): Promise<OutputPayload> {

    let query_term = input_payload.search ? input_payload.search.trim() : input_payload.title;

    let url = `https://apibay.org/q.php?q=${encodeURIComponent(query_term)}&cat=0`

    let res = await new request({
        url: url,
        method: "get",
    }).send();

    const data = res.body_json();

    let output_payload = [];
    for (let i = 0; i < data.length; i++) {
        output_payload.push({
            id: data[i].id,
            title: data[i].name,
        });
    }
    
    return output_payload;
}