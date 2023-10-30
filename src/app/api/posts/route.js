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

export async function POST(request) {
    const requestData = await request.json();

    const { title, content, img, categoryId, adminId, postDate } = requestData;

    if (!title || !content || !img || !categoryId || !adminId || !postDate) {
        return new Response(
            JSON.stringify({ error: "Missing required fields" }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const queryText = "INSERT INTO post (title, content, img, category_ID, admin_ID, postDate) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [title, content, img, categoryId, adminId, postDate];

    try {
        const result = await query({
            query: queryText,
            values: values,
        });

        if (result.affectedRows === 1) {
            return new Response(
                JSON.stringify({ message: "Post created successfully" }),
                { status: 201, headers: { 'Content-Type': 'application/json' } }
            );
        } else {
            return new Response(
                JSON.stringify({ error: "Error creating the post" }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }
    } catch (error) {
        console.error("Error creating the post:", error);
        return new Response(
            JSON.stringify({ error: "Error creating the post" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
