import { describe, it, expect } from "vitest"
import { normalizePath } from "./utils"

describe("normalizePath", () => {
  it("returns regular paths unchanged", () => {
    expect(normalizePath("/about")).toBe("/about")
    expect(normalizePath("/blog/post-1")).toBe("/blog/post-1")
  })

  it("decodes URL components correctly", () => {
    expect(normalizePath("/my%20path")).toBe("/my path")
    expect(normalizePath("/hello%20world")).toBe("/hello world")
  })

  it("handles malformed URI components safely (catch block)", () => {
    // decodeURIComponent throws URIError on invalid sequences like /%
    expect(normalizePath("/%")).toBe("/%")
    expect(normalizePath("/%E0%A4%A")).toBe("/%E0%A4%A")
  })

  it("removes /index.html suffix", () => {
    expect(normalizePath("/index.html")).toBe("/")
    expect(normalizePath("/blog/index.html")).toBe("/blog")
  })

  it("removes .html suffix", () => {
    expect(normalizePath("/about.html")).toBe("/about")
    expect(normalizePath("/blog/post.html")).toBe("/blog/post")
  })

  it("removes trailing slashes", () => {
    expect(normalizePath("/blog/")).toBe("/blog")
    expect(normalizePath("/about//")).toBe("/about")
  })

  it("returns / for empty or root equivalent paths", () => {
    expect(normalizePath("")).toBe("/")
    expect(normalizePath("/")).toBe("/")
    expect(normalizePath("//")).toBe("/")
  })

  it("handles combinations of edge cases (respecting order of replacement)", () => {
    // The order is:
    // 1. replace(/\/index\.html$/, "/")
    // 2. replace(/\.html$/, "")
    // 3. replace(/\/+$/, "")

    // Test: "/blog/index.html/"
    // /index.html$ won't match because of trailing slash.
    // .html$ won't match.
    // /+$ matches, so it becomes "/blog/index.html".
    expect(normalizePath("/blog/index.html/")).toBe("/blog/index.html")

    // Test: "/about.html/"
    // Similarly, trailing slash prevents .html$ match.
    // It becomes "/about.html"
    expect(normalizePath("/about.html/")).toBe("/about.html")
  })
})
