import { query } from "../../../../lib/db";

export async function GET(request) {
    const postId = parseInt(request.url.split("/").pop(), 10);
    if (isNaN(postId)) {
        return new Response("Invalid post ID", {
            status: 400,
        });
    }
    const postAdminQuery = {
        query: "SELECT post.*, admin.username, admin.full_name FROM post INNER JOIN admin ON post.admin_ID = admin.admin_ID WHERE post.post_ID = ?",
        values: [postId],
    };

    try {
        const postAdminData = await query(postAdminQuery);

        if (postAdminData.length === 0) {
            return new Response("Post not found", {
                status: 404,
            });
        }

        let data = JSON.stringify(postAdminData[0]);
        return new Response(data, {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error fetching post with admin info:", error);
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

export async function PUT(request) {
    const postId = parseInt(request.url.split("/").pop(), 10);
    if (isNaN(postId)) {
        return new Response("Invalid post ID", {
            status: 400,
        });
    }

    const requestBody = await request.json();

    const updateQuery = {
        query: "UPDATE post SET title = ?, content = ?, img = ? WHERE post_ID = ?",
        values: [requestBody.title, requestBody.content, requestBody.img, postId],
    };

    try {
        const result = await query(updateQuery);

        if (result.affectedRows === 0) {
            return new Response("Post not found", {
                status: 404,
            });
        }

        return new Response("Post updated successfully", {
            status: 200,
        });
    } catch (error) {
        console.error("Error updating post:", error);
        return new Response("Internal Server Error", {
            status: 500,
        });
    }
}
