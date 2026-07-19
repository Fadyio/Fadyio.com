import { describe, it, expect, vi } from "vitest"
import { getTags } from "../content"

vi.mock("astro:content", () => {
  return {
    getCollection: vi.fn().mockResolvedValue([
      { data: { tags: ["apple", "banana"], date: new Date("2023-01-01") } },
      { data: { tags: ["apple", "cherry"], date: new Date("2023-01-02") } },
      {
        data: {
          tags: ["banana", "banana", "date"],
          date: new Date("2023-01-03"),
        },
      }, // Deduplicate tag 'banana' within a post
      { data: { tags: undefined, date: new Date("2023-01-04") } }, // Handle missing tags gracefully
    ]),
  }
})

describe("getTags", () => {
  it("should aggregate, deduplicate, and sort tags correctly", async () => {
    const tags = await getTags()

    // Verify tag counts and correct posts association
    expect(tags.get("apple")).toHaveLength(2)
    expect(tags.get("banana")).toHaveLength(2) // From post 1 and post 3
    expect(tags.get("cherry")).toHaveLength(1)
    expect(tags.get("date")).toHaveLength(1)

    // Verify sorting:
    // 1. By frequency descending
    // 2. Alphabetically ascending (if frequencies match)
    const sortedTagKeys = Array.from(tags.keys())
    expect(sortedTagKeys).toEqual(["apple", "banana", "cherry", "date"])
  })
})
