import { getUrlsCollection } from "@/db";
import { redirect } from "next/navigation";

export default async function RedirectPage({
                                               params,
                                           }: {
    params: Promise<{ alias: string }>;
}) {
    const { alias } = await params;

    const collection = await getUrlsCollection();
    const entry = await collection.findOne({ alias });

    if (!entry) {
        return redirect("/");
    }

    redirect(entry.url);
}
