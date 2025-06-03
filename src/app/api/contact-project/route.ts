import { NextResponse } from "next/server";
import { sendDiscordMessage } from "@/lib/discord";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        await sendDiscordMessage({
            content: "ACTIVOS! Hay un nuevo mensaje de contacto. Pónganse en contacto con el cliente y respondan rápido para ganar el dinero. @everyone",
            embeds: [
                {
                    title: `${data.name} | ${data.subject || "Sin asunto"}`,
                    description: `${data.message}`,
                    color: 15100682,
                    author: {
                        name: `${data.email}`,
                    },
                },
            ],
        });
        return NextResponse.json({ ok: true });
    } catch (error) {
        return NextResponse.json({ ok: false, error: (error as Error).message }, { status: 500 });
    }
}
