import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function parseJsonBody<T>(req: Request, schema: z.ZodSchema<T>): Promise<{ data: T } | { error: NextResponse }> {
  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    const msg = parsed.error.issues?.[0]?.message ?? 'Invalid input';
    return { error: NextResponse.json({ error: msg }, { status: 400 }) };
  }
  return { data: parsed.data };
}

export function apiError(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}
