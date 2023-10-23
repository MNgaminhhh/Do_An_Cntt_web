import { query } from "../../../../lib/db";

export async function GET(request) {
    const postId = parseInt(request.url.split("/").pop(), 10); // Extract post ID from the URL
    if (isNaN(postId)) {
        return new Response("Invalid post ID", {
            status: 400,
        });
    }

    const postQuery = {
        query: "SELECT * FROM post WHERE post_ID = ?",
        values: [postId],
    };

    try {
        const post = await query(postQuery);

        if (post.length === 0) {
            return new Response("Post not found", {
                status: 404,
            });
        }

        let data = JSON.stringify(post[0]);
        return new Response(data, {
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching post:", error);
        return new Response("Internal Server Error", {
            status: 500,
        });
    }
}
export async function DELETE(request) {
    const postId = parseInt(request.url.split("/").pop(), 10);
    if (isNaN(postId)) {
        return new Response("Invalid post ID", {
            status: 400,
        });
    }
    const deleteQuery = {
        query: "DELETE FROM post WHERE post_ID = ?",
        values: [postId],
    };

    try {
        const result = await query(deleteQuery);

        if (result.affectedRows === 0) {
            return new Response("Post not found", {
                status: 404,
            });
        }

        return new Response("Post deleted successfully", {
            status: 200,
        });
    } catch (error) {
        console.error("Error deleting post:", error);
        return new Response("Internal Server Error", {
            status: 500,
        });
    }
}