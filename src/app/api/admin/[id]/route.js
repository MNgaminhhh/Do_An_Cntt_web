import { query } from "../../../../lib/db";

export async function GET(request) {
    const adminId = parseInt(request.url.split("/").pop(), 10); 
    if (isNaN(adminId)) {
        return new Response("Invalid admin ID", {
            status: 400,
        });
    }

    const adminQuery = {
        query: "SELECT * FROM admin WHERE admin_ID = ?",
        values: [adminId],
    };

    try {
        const admin = await query(adminQuery);

        if (admin.length === 0) {
            return new Response("Admin not found", {
                status: 404,
            });
        }

        let data = JSON.stringify(admin[0]);
        return new Response(data, {
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching admin:", error);
        return new Response("Internal Server Error", {
            status: 500,
        });
    }
}
export async function PUT(request) {
    const adminId = parseInt(request.url.split("/").pop(), 10);

    if (isNaN(adminId)) {
        return new Response("Invalid admin ID", {
            status: 400,
        });
    }

    const requestBody = await request.json();

    const updatePasswordQuery = {
        query: "UPDATE admin SET password = ? WHERE admin_ID = ?",
        values: [requestBody.password, adminId],
    };

    try {
        const updateResult = await query(updatePasswordQuery);

        if (updateResult.affectedRows > 0) {
            return new Response("Password updated successfully", {
                status: 200,
            });
        } else {
            return new Response("Failed to update password", {
                status: 500,
            });
        }
    } catch (error) {
        console.error("Error updating password:", error);
        return new Response("Internal Server Error", {
            status: 500,
        });
    }
}
export async function DELETE(request) {
    const adminId = parseInt(request.url.split("/").pop(), 10);

    if (isNaN(adminId)) {
        return new Response("Invalid admin ID", {
            status: 400,
        });
    }

    try {
        const deletePostsQuery = {
            query: "DELETE FROM post WHERE admin_ID = ?",
            values: [adminId],
        };
        const deleteAdminQuery = {
            query: "DELETE FROM admin WHERE admin_ID = ?",
            values: [adminId],
        };
        const deletePostsResult = await query(deletePostsQuery);
        const deleteAdminResult = await query(deleteAdminQuery);

        if (deleteAdminResult.affectedRows > 0) {
            return new Response("Admin account and related posts deleted successfully", {
                status: 200,
            });
        } else {
            return new Response("Failed to delete admin account", {
                status: 500,
            });
        }
    } catch (error) {
        console.error("Error deleting admin account:", error);
        return new Response("Internal Server Error", {
            status: 500,
        });
    }
}
