import excuteQuery from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const quiz_id = searchParams.get("quiz_id");
  try {
    const quiz = await excuteQuery({
      query: "SELECT * FROM quizzes where id=?",
      values: [quiz_id],
    });

    const questions = await excuteQuery({
      query: "select * from quiz_questions where quiz_id=?",
      values: [quiz_id],
    });

    return NextResponse.json({
      status: true,
      data: { quiz: quiz[0], questions: questions },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: false, message: err.message });
  }
}

export async function POST(req) {
  const body = await req.json();
  console.log(body);
  try {
    const data = await excuteQuery({
      query:
        "insert into responses (quiz_id, student_name,score) values(?,?,?)",
      values: [body.quiz_id, body.student_name, body.score],
    });
    await excuteQuery({
      query: "update quizzes set total_responses=total_responses+1 where id=?",
      values: [body.quiz_id],
    });
    return NextResponse.json({
      status: true,
      message: "Successfully summited response",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: false, message: err.message });
  }
}
