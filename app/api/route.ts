'use server';

import { createLink } from "@/lib/createLink";

export async function POST(req: Request) {
    try {
        const { url, alias } = await req.json();
        const result = await createLink(url, alias);
        return Response.json(result);
    } catch (err: unknown) {
        if (err instanceof Error) {
            return Response.json({ error: err.message });
        }
        return Response.json({ error: 'Something went wrong.' });
    }
}
