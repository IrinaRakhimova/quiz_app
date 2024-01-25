import { sql } from "../../database/database.js";

const randomQuestion = async ({ response }) => {
    const result = await sql`SELECT questions.id AS questionid, questions.question_text AS questiontext, question_answer_options.id AS optionid, question_answer_options.option_text AS optiontext 
                              FROM questions 
                              LEFT JOIN question_answer_options ON questions.id = question_answer_options.question_id
                              ORDER BY RANDOM() LIMIT 1`;
                        

    if (result.length === 0) {
      response.body = {};
      return;
    }

    const formattedResult = {
      questionid: result[0].questionid,
      questiontext: result[0].questiontext,
      answeroptions: result.map((row) => ({
       optionid: row.optionid,
       optiontext: row.optiontext, 
      })),
    };

    response.body = formattedResult;
  
  }; 

  const answerQuestion = async ({ request, response }) => {
    const body = request.body({ type: "json" });
    const document = await body.value;

    console.log("Received JSON:", document);

    const isCorrect = async (id) => {
      const result = await sql`SELECT is_correct FROM question_answer_options WHERE id = ${id}`; 
      return result[0]?.is_correct || false;
    };

    const findCorrectAnswer = await isCorrect(document.optionId);
    
  const isCorrectAnswer = document.optionId === findCorrectAnswer;

  response.body = { correct: isCorrectAnswer };
  };

  export { randomQuestion, answerQuestion };