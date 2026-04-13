
export type InputPayload = {
    id: string;
    title: string;
    title_secondary: string;
    source: string;
    season: number;
    episode: number;
    search?: string;
    page: number;
}

export type OutputPayloadInfo = {
    id: string;
    title: string;
}


export type OutputPayload = OutputPayloadInfo[];