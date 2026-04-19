import type { Hono } from "hono";


// ATXP: requirePayment only fires inside an ATXP context (set by atxpHono middleware).
// For raw x402 requests, the existing @x402/hono middleware handles the gate.
// If neither protocol is active (ATXP_CONNECTION unset), tryRequirePayment is a no-op.
async function tryRequirePayment(price: number): Promise<void> {
  if (!process.env.ATXP_CONNECTION) return;
  try {
    const { requirePayment } = await import("@atxp/server");
    const BigNumber = (await import("bignumber.js")).default;
    await requirePayment({ price: BigNumber(price) });
  } catch (e: any) {
    if (e?.code === -30402) throw e;
  }
}

export function registerRoutes(app: Hono) {
  app.post("/api/convert", async (c) => {
    await tryRequirePayment(0.001);
    const body = await c.req.json().catch(() => null);
    if (!body?.datetime || !body?.from || !body?.to)
      return c.json({ error: "Missing required fields: datetime, from, to" }, 400);

    try {
      const date = new Date(body.datetime);
      if (isNaN(date.getTime())) return c.json({ error: "Invalid datetime format" }, 400);

      const fromFormat = new Intl.DateTimeFormat("en-US", {
        timeZone: body.from, year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZoneName: "short",
      });
      const toFormat = new Intl.DateTimeFormat("en-US", {
        timeZone: body.to, year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZoneName: "short",
      });

      const fromParts = fromFormat.formatToParts(date);
      const toParts = toFormat.formatToParts(date);

      const extract = (parts: Intl.DateTimeFormatPart[]) => {
        const get = (type: string) => parts.find((p) => p.type === type)?.value || "";
        return {
          formatted: `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}:${get("second")}`,
          abbreviation: get("timeZoneName"),
        };
      };

      const from = extract(fromParts);
      const to = extract(toParts);

      return c.json({
        input: { datetime: body.datetime, timezone: body.from },
        from: { datetime: from.formatted, timezone: body.from, abbreviation: from.abbreviation },
        to: { datetime: to.formatted, timezone: body.to, abbreviation: to.abbreviation },
        utc: date.toISOString(),
      });
    } catch (e: any) {
      return c.json({ error: `Timezone error: ${e.message}. Use IANA format (e.g. America/New_York)` }, 400);
    }
  });
}
