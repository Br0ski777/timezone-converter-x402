import type { ApiConfig } from "./shared";

export const API_CONFIG: ApiConfig = {
  name: "timezone-converter",
  slug: "timezone-converter",
  description: "Convert datetime between timezones -- all IANA zones, UTC offset, DST-aware. ISO 8601 input/output.",
  version: "1.0.0",
  routes: [
    {
      method: "POST",
      path: "/api/convert",
      price: "$0.001",
      description: "Convert a datetime between timezones",
      toolName: "utility_convert_timezone",
      toolDescription: `Use this when you need to convert a date/time from one timezone to another. Returns the converted datetime with offset data in JSON.

Returns: 1. convertedDatetime (ISO 8601) 2. fromTimezone and toTimezone 3. utcOffset (e.g. "+01:00") 4. abbreviation (e.g. "CET", "EST") 5. isDST (boolean) 6. originalDatetime.

Example output: {"originalDatetime":"2026-04-13T14:30:00","fromTimezone":"America/New_York","toTimezone":"Europe/Paris","convertedDatetime":"2026-04-13T20:30:00","utcOffset":"+02:00","abbreviation":"CEST","isDST":true}

Use this FOR scheduling meetings across timezones, converting log timestamps, coordinating international events, and displaying local times.

Do NOT use for currency conversion -- use finance_convert_currency instead. Do NOT use for unit conversion -- use utility_convert_units instead. Do NOT use for weather data -- use data_get_weather instead.`,
      inputSchema: {
        type: "object",
        properties: {
          datetime: { type: "string", description: "Date/time string (ISO 8601 or human-readable, e.g. '2024-01-15T14:30:00')" },
          from: { type: "string", description: "Source IANA timezone (e.g. America/New_York)" },
          to: { type: "string", description: "Target IANA timezone (e.g. Europe/Paris)" },
        },
        required: ["datetime", "from", "to"],
      },
      outputSchema: {
          "type": "object",
          "properties": {
            "input": {
              "type": "object",
              "properties": {
                "datetime": {
                  "type": "string"
                },
                "timezone": {
                  "type": "string"
                }
              }
            },
            "from": {
              "type": "object",
              "properties": {
                "datetime": {
                  "type": "string"
                },
                "timezone": {
                  "type": "string"
                },
                "abbreviation": {
                  "type": "string"
                }
              }
            },
            "to": {
              "type": "object",
              "properties": {
                "datetime": {
                  "type": "string"
                },
                "timezone": {
                  "type": "string"
                },
                "abbreviation": {
                  "type": "string"
                }
              }
            },
            "utc": {
              "type": "string",
              "description": "UTC ISO 8601 timestamp"
            },
            "offsetDifference": {
              "type": "string",
              "description": "Offset difference between timezones"
            }
          },
          "required": [
            "from",
            "to",
            "utc"
          ]
        },
    },
  ],
};
