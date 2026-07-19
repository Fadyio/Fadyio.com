import { describe, it, expect } from "vitest"
import { formatDate } from "./utils"

describe("formatDate", () => {
  it("formats a standard date correctly in UTC", () => {
    // January 1, 2024
    const date = new Date("2024-01-01T00:00:00Z")
    expect(formatDate(date)).toBe("Jan 1, 2024")
  })

  it("formats another standard date correctly in UTC", () => {
    // December 31, 2023
    const date = new Date("2023-12-31T00:00:00Z")
    expect(formatDate(date)).toBe("Dec 31, 2023")
  })

  it("handles different timezones properly because it formats as UTC", () => {
    // If the input date represents a specific point in time,
    // formatDate will always output the string corresponding to its UTC representation.
    const date = new Date("2024-01-01T05:00:00+05:00") // This is 2024-01-01 00:00:00 in UTC
    expect(formatDate(date)).toBe("Jan 1, 2024")
  })

  it("formats leap day correctly", () => {
    // February 29, 2024
    const date = new Date("2024-02-29T00:00:00Z")
    expect(formatDate(date)).toBe("Feb 29, 2024")
  })
})
