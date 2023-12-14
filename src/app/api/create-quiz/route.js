import excuteQuery from "../../../../lib/db";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const body = await req.json();
  console.log(body);

  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: `user:i will provide you the name of topics, create quiz on them based on difficulty and create given number of question with each having 4 options, do not to numbering to options, provide the output in json format in this format array of object, the object should have question, options array, right answer. input: topic: [${body.topics}], difficulty: ${body.difficulty}, no_questions: ${body.no_questions}`,
      temperature: 1,
      max_tokens: 560,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    let jsonString = response.choices[0].text;

    // Find the index of the first occurrence of '[' (start of JSON array)
    let startIndex = jsonString.indexOf("[");

    // Find the index of the last occurrence of ']' (end of JSON array)
    let endIndex = jsonString.lastIndexOf("]");

    // Check if '[' is found before ']'
    if (startIndex !== -1 && endIndex > startIndex) {
      // Extract the JSON array part
      let jsonSubstring = jsonString.substring(startIndex, endIndex + 1);

      try {
        // Parse the JSON array
        let responseObject = JSON.parse(jsonSubstring);

        // create quiz and insert it into database
        const result = await excuteQuery({
          query:
            "INSERT INTO quizzes (name, topics, teacher_id, total_responses, avg_score) values(?, ?, ?, ?, ?)",
          values: [body.name, body.topics, body.teacher_id, 0, 0],
        });

        responseObject.map(
          async (question) =>
            await excuteQuery({
              query:
                "insert into quiz_questions (question, options, right_answer, quiz_id) values(?, ?, ?, ?)",
              values: [
                question.question,
                JSON.stringify(question.options),
                question.right_answer,
                result.insertId,
              ],
            })
        );
        console.log(responseObject);

        return NextResponse.json({
          status: true,
          message: "quiz created",
          data: { questions: responseObject, quiz_id: result.insertId },
        });
      } catch (error) {
        console.log(error);
        return NextResponse.json({ status: false, message: "Error try again" });
      }
    } else {
      console.error("Invalid JSON array format in the string.");
      return NextResponse.json({ status: false, message: "Error try again" });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: false, message: err.message });
  }
}
