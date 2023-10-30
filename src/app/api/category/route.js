import { query } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(request) {
    const users = await query({
        query: "SELECT * FROM category",
        values: [],
    });

    let data = JSON.stringify(users);
    return new Response(data, {
        status: 200,
    });
}
export const POST = async (req) => {
    const { categoryName } = await req.json();

    if (!categoryName) {
        return new NextResponse(
            JSON.stringify({ error: "Tên danh mục không được để trống" }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        const queryText = "INSERT INTO category (category_Name) VALUES (?)";
        const values = [categoryName];

        const results = await query({
            query: queryText,
            values: values
        });

        if (results.affectedRows === 1) {
            return new NextResponse(
                JSON.stringify({ message: "Danh mục đã được tạo thành công" }),
                { status: 201, headers: { 'Content-Type': 'application/json' } }
            );
        } else {
            return new NextResponse(
                JSON.stringify({ error: "Lỗi khi thêm danh mục" }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }
    } catch (error) {
        console.error("Lỗi khi thêm danh mục:", error);
        return new NextResponse(
            JSON.stringify({ error: "Lỗi khi thêm danh mục" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};

export const DELETE = async (req) => {
    const { categoryName } = await req.json();
    if (!categoryName) {
        return new NextResponse(
            JSON.stringify({ error: "Tên danh mục không được để trống" }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }
    try {
        const getCategoryQuery = "SELECT category_ID FROM category WHERE category_Name = ?";
        const categoryResult = await query({
            query: getCategoryQuery,
            values: [categoryName]
        });
        if (categoryResult.length === 0) {
            return new NextResponse(
                JSON.stringify({ error: "Danh mục không tồn tại" }),
                { status: 404, headers: { 'Content-Type': 'application/json' }}
            );
        }
        const categoryId = categoryResult[0].category_ID;
        const deletePostsQuery = "DELETE FROM post WHERE category_ID = ?";
        const postsDeleteResult = await query({
            query: deletePostsQuery,
            values: [categoryId]
        });
        const deleteCategoryQuery = "DELETE FROM category WHERE category_ID = ?";
        const categoryDeleteResult = await query({
            query: deleteCategoryQuery,
            values: [categoryId]
        });

        if (categoryDeleteResult.affectedRows === 1) {
            return new NextResponse(
                JSON.stringify({ message: "Danh mục và bài viết liên quan đã được xóa thành công" }),
                { status: 200, headers: { 'Content-Type': 'application/json' }}
            );
        } else {
            return new NextResponse(
                JSON.stringify({ error: "Không tìm thấy danh mục hoặc lỗi khi xóa danh mục" }),
                { status: 404, headers: { 'Content-Type': 'application/json' }}
            );
        }
    } catch (error) {
        console.error("Lỗi khi xóa danh mục:", error);
        return new NextResponse(
            JSON.stringify({ error: "Lỗi khi xóa danh mục" }),
            { status: 500, headers: { 'Content-Type': 'application/json' }}
        );
    }
};

