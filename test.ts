import { describe, it, expect } from "vitest";

import { get_sources } from "./src/plugin";

describe("get_sources", () => {
    it("should fetch sources", async () => {
        let result = await get_sources({
            id: "test",
            title: "love is war",
            source: "anime",
            season: 1,
            episode: 1,
            page: 1
        });

        console.log(result);
        expect(result).toBeDefined();
    });
});
