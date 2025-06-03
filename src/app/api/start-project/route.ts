import { NextResponse } from "next/server";
import { sendDiscordMessage } from "@/lib/discord";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        await sendDiscordMessage({
            "content": "ACTIVOS! Hay un nuevo proyecto por hacer, pónganse en contacto con el cliente\ny desarollen la app rapdio para ganar el dinero. @everyone",
            "embeds": [
                {
                    "title": `${data.name} | ${data.plan}`,
                    "description": `${data.description}`,
                    "color": 15100682,
                    "author": {
                        "name": `${data.email} - ${data.phone}`,
                    }
                }
            ],
        });
        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Error al enviar el mensaje a Discord:", error);
        return NextResponse.json({ ok: false, error: (error as Error).message }, { status: 500 });
    }
}
