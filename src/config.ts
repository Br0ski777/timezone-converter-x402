import type { ApiConfig } from "./shared";

export const API_CONFIG: ApiConfig = {
  name: "timezone-converter",
  slug: "timezone-converter",
  description: "Convert datetime between timezones. Supports all IANA timezone names.",
  version: "1.0.0",
  routes: [
    {
      method: "POST",
      path: "/api/convert",
      price: "$0.001",
      description: "Convert a datetime between timezones",
      toolName: "utility_convert_timezone",
      toolDescription: "Use this when you need to convert a date/time from one timezone to another. Supports all IANA timezone names (America/New_York, Europe/Paris, Asia/Tokyo, etc.). Returns converted time, UTC offset, and timezone abbreviation. Do NOT use for currency conversion — use finance_convert_currency instead. Do NOT use for unit conversion — use utility_convert_units instead.",
      inputSchema: {
        type: "object",
        properties: {
          datetime: { type: "string", description: "Date/time string (ISO 8601 or human-readable, e.g. '2024-01-15T14:30:00')" },
          from: { type: "string", description: "Source IANA timezone (e.g. America/New_York)" },
          to: { type: "string", description: "Target IANA timezone (e.g. Europe/Paris)" },
        },
        required: ["datetime", "from", "to"],
      },
    },
  ],
};
