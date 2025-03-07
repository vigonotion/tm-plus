import { atomWithStorage } from "jotai/utils";

// Define the possible date range values
export type DateRangeValue = "all" | "three_months" | "year";

// Create an atom with localStorage persistence
export const dateRangeAtom = atomWithStorage<DateRangeValue>(
  "dateRange",
  "all"
);

// Calculate date ranges based on the current date
export function getDateRanges() {
  const now = new Date();
  return {
    all: undefined,
    year: new Date(
      now.getFullYear() - 1,
      now.getMonth(),
      now.getDate()
    ).toISOString(),
    three_months: new Date(
      now.getFullYear(),
      now.getMonth() - 3,
      now.getDate()
    ).toISOString(),
  };
}

// Helper function to get the display name for a date range
export function getDateRangeDisplayName(value: DateRangeValue): string {
  switch (value) {
    case "all":
      return "All time";
    case "three_months":
      return "Past 3 months";
    case "year":
      return "Past year";
    default:
      return "Unknown";
  }
}
