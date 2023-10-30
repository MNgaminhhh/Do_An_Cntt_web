import { NextResponse } from "next/server";
import util from "util";
import { query } from "@/lib/db";

export const POST = async (req) => {
    const admin = await req.json();
    try {
        const existingAdmin = await query({
            query: "SELECT * FROM admin WHERE username = ?",
            values: [admin.username]
        });
        if (existingAdmin.length > 0) {
            return new NextResponse(
                JSON.stringify({ error: "Tên đăng nhập đã tồn tại !" }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const results = await query({
            query: "INSERT INTO admin (username, password, full_name) VALUES (?, ?, ?)",
            values: [admin.username, admin.password, admin.fullname]
        });

        if (results.affectedRows === 1) {
            return new NextResponse(admin, { status: 201 });
        } else {
            return new NextResponse({ error: "Registration failed" }, { status: 400 });
        }
    } catch (error) {
        console.error(error);
        return new NextResponse({ error: "Internal server error" }, { status: 500 });
    }
};
