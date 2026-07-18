# Timezone Converter API

[![MCP Server](https://img.shields.io/badge/MCP-server-blue)](https://timezone-converter.api.klymax402.com/mcp)
[![x402](https://img.shields.io/badge/payments-x402-6E56CF)](https://x402.org)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Convert datetime between timezones -- all IANA zones, UTC offset, DST-aware. ISO 8601 input/output. Pay-per-call via [x402](https://x402.org) (USDC on Base L2) -- no API key, no signup, no rate-limit wall.

Part of the [klymax402](https://klymax402.com) marketplace -- 100 x402 micropayment APIs for AI agents, one wallet, USDC on Base.

## Quickstart -- MCP

Add to your MCP client config (Claude Desktop, Cursor, ElizaOS, etc.):

```json
{
  "mcpServers": {
    "timezone-converter": {
      "url": "https://timezone-converter.api.klymax402.com/mcp"
    }
  }
}
```

## Quickstart -- HTTP (x402)

```bash
curl -X POST "https://timezone-converter.api.klymax402.com/api/convert" \
  -H "Content-Type: application/json" \
  -d '{"datetime":"...","from":"...","to":"..."}'
# -> 402 Payment Required, with an x402 payment challenge in the response body
```

Any x402-aware client ([`@x402/fetch`](https://www.npmjs.com/package/@x402/fetch), [`x402-agent-tools`](https://www.npmjs.com/package/x402-agent-tools), ATXP) handles the 402 -> sign -> retry cycle automatically.

## Tools

| Tool | Method | Path | Price | Description |
|---|---|---|---|---|
| `utility_convert_timezone` | POST | `/api/convert` | $0.003 | Convert a datetime between timezones |

### `utility_convert_timezone`

Use this when you need to convert a date/time from one timezone to another. Returns the converted datetime with offset data in JSON.

**Parameters**

| Name | Type | Required | Description |
|---|---|---|---|
| `datetime` | string | yes | Date/time string (ISO 8601 or human-readable, e.g. '2024-01-15T14:30:00') |
| `from` | string | yes | Source IANA timezone (e.g. America/New_York) |
| `to` | string | yes | Target IANA timezone (e.g. Europe/Paris) |

Example response:

```json
{"originalDatetime":"2026-04-13T14:30:00","fromTimezone":"America/New_York","toTimezone":"Europe/Paris","convertedDatetime":"2026-04-13T20:30:00","utcOffset":"+02:00","abbreviation":"CEST","isDST":true}
```

**When to use**: scheduling meetings across timezones, converting log timestamps, coordinating international events, and displaying local times.

**Not for**: currency conversion (use `finance_convert_currency`), unit conversion (use `utility_convert_units`), weather data (use `data_get_weather`).

## Example agent prompts

- "Convert a date/time from one timezone to another"

## Payment

- Protocol: [x402](https://x402.org) -- HTTP-native pay-per-call, no signup, no API key
- Network: Base L2 (`eip155:8453`)
- Asset: USDC
- Facilitator: Coinbase CDP (primary), PayAI (fallback)
- Also reachable via [ATXP](https://atxp.ai) (OAuth-wrapped x402, RFC 9728 protected-resource metadata)

## Part of klymax402

100 x402 micropayment APIs for AI agents -- one wallet, USDC on Base, zero signup.

- Catalog: https://klymax402.com/llms.txt
- Full API reference: https://klymax402.com/llms-full.txt
- Live stats: https://klymax402.com/stats

## License

MIT
