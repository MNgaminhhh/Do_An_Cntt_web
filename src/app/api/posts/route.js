import { query } from "../../../lib/db";
import url from 'url';

export async function GET(request) {
    const parsedUrl = url.parse(request.url, true);
    const category = parsedUrl.query.cat;
    if (category) {
        const posts = await query({
            query: "SELECT * FROM post INNER JOIN category ON post.category_ID = category.category_ID WHERE category.category_Name = ?",
            values: [category],
        });

        let data = JSON.stringify(posts);
        return new Response(data, {
            status: 200,
        });
    } else {
        const posts = await query({
            query: "SELECT * FROM post",
            values: [],
        });

        let data = JSON.stringify(posts);
        return new Response(data, {
            status: 200,
        });
    }
}