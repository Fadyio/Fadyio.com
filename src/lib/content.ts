import { SITE } from "@/consts"
import { getCollection, type CollectionEntry } from "astro:content"

export const pageTitle = (title: string) => `${title} | ${SITE.title}`

let _postsCache: Promise<CollectionEntry<"blog">[]> | undefined

export async function getPosts(): Promise<CollectionEntry<"blog">[]> {
  if (_postsCache) {
    return _postsCache
  }

  _postsCache = getCollection("blog", ({ data }) => !data.draft).then((posts) =>
    posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime()),
  )

  return _postsCache
}

export async function getTags(): Promise<
  Map<string, CollectionEntry<"blog">[]>
> {
  const posts = await getPosts()
  const tags = new Map<string, CollectionEntry<"blog">[]>()

  for (const post of posts) {
    for (const tag of new Set(post.data.tags ?? [])) {
      const tagged = tags.get(tag)
      if (tagged) tagged.push(post)
      else tags.set(tag, [post])
    }
  }

  return new Map(
    [...tags].sort(
      ([a, postsA], [b, postsB]) =>
        postsB.length - postsA.length || a.localeCompare(b),
    ),
  )
}
