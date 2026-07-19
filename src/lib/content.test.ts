import { describe, it, expect, vi, beforeEach } from "vitest"
import { getPosts, getTags, pageTitle } from "./content"
import { SITE } from "../consts" // use relative path just in case alias fails in vitest out of the box

// Mock astro:content
vi.mock("astro:content", () => {
  return {
    getCollection: vi.fn(),
  }
})

import { getCollection } from "astro:content"

describe("content.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe("getPosts", () => {
    it("should filter out draft posts and sort by date descending", async () => {
      // Create mock data
      const mockPosts = [
        {
          id: "post-1",
          data: {
            title: "Post 1 (Old)",
            date: new Date("2023-01-01"),
            draft: false,
          },
        },
        {
          id: "post-2",
          data: {
            title: "Post 2 (Draft)",
            date: new Date("2023-12-31"),
            draft: true,
          },
        },
        {
          id: "post-3",
          data: {
            title: "Post 3 (New)",
            date: new Date("2023-06-01"),
            draft: false,
          },
        },
      ]

      // Implement mock to simulate getCollection's behavior
      vi.mocked(getCollection).mockImplementation(
        async (collection, filterFn) => {
          if (collection === "blog") {
            return filterFn ? mockPosts.filter(filterFn) : mockPosts
          }
          return []
        },
      )

      const posts = await getPosts()

      // Should exclude draft (post-2)
      expect(posts.length).toBe(2)

      // Should be sorted by date descending (post-3 then post-1)
      expect(posts[0].id).toBe("post-3")
      expect(posts[1].id).toBe("post-1")
    })
  })
})
