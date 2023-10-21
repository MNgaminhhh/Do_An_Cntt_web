import { NextResponse } from "next/server";
import util from "util";
import { query } from "@/lib/db";
import bcrypt from "bcrypt";

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
        const hashedPassword = await bcrypt.hash(admin.password, 10);
        const results = await query({
            query: "INSERT INTO admin (username, password) VALUES (?, ?)",
            values: [admin.username, hashedPassword]
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