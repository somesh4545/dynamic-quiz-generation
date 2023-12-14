import excuteQuery from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const param = searchParams.get("teacher_id");
  const teacherId = param;
  console.log("Teacher: " + teacherId);

  try {
    const result = await excuteQuery({
      query: "SELECT * FROM quizzes WHERE teacher_id = ?",
      values: [teacherId],
    });

    return NextResponse.json({
      status: true,
      data: result,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: false, message: err.message });
  }
}
