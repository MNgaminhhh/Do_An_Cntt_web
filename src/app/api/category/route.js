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