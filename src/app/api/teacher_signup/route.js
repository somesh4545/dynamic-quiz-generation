import excuteQuery from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  try {
    const checkEmailResult = await excuteQuery({
      query: "SELECT * FROM teachers WHERE email=?",
      values: [body.email],
    });
    if (checkEmailResult.length > 0) {
      return NextResponse.json({
        status: false,
        message: "Email is already registered. Please use a different email.",
      });
    }

    const insertResult = await excuteQuery({
      query: "INSERT INTO teachers (email, password) VALUES (?, ?)",
      values: [body.email, body.password],
    });

    return NextResponse.json({
      status: true,
      message: "Signup Successfull",
      data: { id: insertResult.insertId},
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: false, message: err.message });
  }
}
