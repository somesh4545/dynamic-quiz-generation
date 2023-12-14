import excuteQuery from "../../../../lib/db";
import { NextResponse } from "next/server";
export async function POST(req) {
  const body = await req.json();
  console.log(body);
  try {
    const result = await excuteQuery({
      query: "SELECT * FROM teachers WHERE email=? and password=?",
      values: [body.email, body.password],
    });
    console.log(req.body.email, req.body.password, result);
    if (result.length == 0) {
      return NextResponse.json({
        status: false,
        message: "Incorrect email or password",
      });
    } else {
      return NextResponse.json({
        status: true,
        message: "Login Successfull",
        data: result[0],
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: false, message: err.message });
  }
}
