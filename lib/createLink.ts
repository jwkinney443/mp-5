import { getUrlsCollection } from "@/db";

export async function createLink(url: string, alias: string) {
    const urlRegex = /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(:\d+)?(\/\S*)?$/;

    // URL Validating
    if (!urlRegex.test(url)) {
        throw new Error("Invalid URL format");
    }


    // Alias Validating
    if (!alias || alias.trim() === "") {
        throw new Error("Alias cannot be empty");
    }

    // Cannot contain /, ?, &, =, whitespace, etc.
    const badChars = /[\/?&=\s]/;
    if (badChars.test(alias)) {
        throw new Error("Alias contains invalid characters");
    }

    let res: Response;
    try {
        res = await fetch(url, { method: "HEAD", redirect: "manual" });
    } catch {
        throw new Error("Could not reach the URL");
    }

    // URL Validating continued: check head -> check status code
    if (res.status >= 200 && res.status !== 404 && res.status < 500) {
        const collection = await getUrlsCollection();
        const existing = await collection.findOne({ alias });

        if (existing) {
            throw new Error("Alias already exists");
        }

        await collection.insertOne({ alias, url });
        return { message: "shortened", alias };
    }

    throw new Error(`URL responded with the status ${res.status}`);
}
