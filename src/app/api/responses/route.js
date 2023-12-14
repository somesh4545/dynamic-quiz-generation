import excuteQuery from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const quizId = searchParams.get("quiz_id");

  try {
    const responses = await excuteQuery({
      query: "SELECT * FROM responses WHERE quiz_id = ?",
      values: [quizId],
    });
    const quiz = await excuteQuery({
      query: "SELECT * FROM quizzes WHERE id = ?",
      values: [quizId],
    });

    return NextResponse.json({
      status: true,
      data: { responses: responses, quiz: quiz[0] },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: false, message: err.message });
  }
}
