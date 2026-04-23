import { describe, it, expect } from "vitest";

import { get_sources, get_torrents } from "./src/plugin";

describe("get_sources", () => {
    it("should fetch sources", async () => {
        let result = await get_sources({
            id: "tt10872600",
            title: "one",
            title_secondary: "one",
            source: "tv",
            season: 1,
            episode: 1,
            page: 1,
            search: ""
        });

        console.log(result);
        expect(result).toBeDefined();
    });
});

// describe("get_torrents", () => {
//     it("should fetch sources", async () => {
//         let result = await get_torrents({
//             id: '65250016',
//             source: "anime",
//             page: 1
//         })

//         console.log(result);
//     });
// });

