import type * as get_sources_types from "@plugin_provider/global/types/get_sources";
import type * as get_torrents_types from "@plugin_provider/global/types/get_torrents";


export async function get_sources(input_payload: get_sources_types.InputPayload): Promise<get_sources_types.OutputPayload> {
    if (input_payload.page > 1) return [];
    
    const get_sources = await import("./get_sources");

    switch (input_payload.source) {
        case "anime":
            return await get_sources.anime(input_payload);
        case "movies":
            return await get_sources.movies(input_payload);
        case "tv":
            return await get_sources.tv(input_payload);
        default:
            throw new Error("Unknown source");
    }
}

export async function get_torrents(input_payload: get_torrents_types.InputPayload): Promise<get_torrents_types.OutputPayload> {
    if (input_payload.page > 1) return [];
    
    const get_torrents = await import("./get_torrents");

    return await get_torrents.default(input_payload);
}