import { NextResponse } from "next/server";
import { z } from "zod";
import { ingestSignal, getBrainState } from "@/lib/company-brain";

const SignalSchema = z.object({
  id: z.string(),
  source: z.enum(["SALES", "MARKETING", "CASHFLOW", "TAX", "COMPLIANCE", "CYBERSECURITY"]),
  createdAt: z.string(),
  summary: z.object({
    uz: z.string(),
    ru: z.string(),
    en: z.string()
  }),
  category: z.enum(["LOSS", "RISK", "OPPORTUNITY", "DEADLINE"]),
  moneyImpact: z.number(),
  riskLevel: z.enum(["LOW", "MED", "HIGH", "CRITICAL"]),
  urgency: z.number(),
  scope: z.string(),
  evidence: z
    .array(
      z.object({
        refId: z.string(),
        refType: z.enum(["order", "complaint", "session", "document", "log", "other"])
      })
    )
    .optional(),
  subtype: z.string()
});

export async function GET() {
  return NextResponse.json(getBrainState());
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = SignalSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "INVALID_SIGNAL", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  ingestSignal(parsed.data);
  return NextResponse.json({ status: "INGESTED" });
}
