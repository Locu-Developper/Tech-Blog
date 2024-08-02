import type {APIRoute} from "astro";
export const GET: APIRoute = async ({request}) => {
    const query = new URLSearchParams((new URL(request.url)).search);
    const url = query.get("url") ?? "";

    let textRes = await fetch(url)
        .then(res => res.text())
        .then(text => text)

    return new Response(JSON.stringify({
            result: textRes
        })
    )
}